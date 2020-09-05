import {
  put,
  all,
  call,
  fork,
  delay,
  select,
  take,
  race
} from "redux-saga/effects";
import { thermostatService } from "../services/thermostatService";
import {
  changeSetpointTemperature,
  changeTemperatureCompleted,
  changeTemperatureFailed,
  fetchTemperatureCompleted,
  fetchTemperatureFailed,
  fetchTemperatureStarted
} from "../actions/thermostat";
import type { State, statusRequests } from "../reducers/reducer";
import type {
  ApiResponseTypes,
  ClientMessage,
  IDataType
} from "../types/thermoTypes";
import { errorMessage } from "../actions/action";
import { ServerStatus } from "../types/thermoTypes";
import { setTemperatureStatus } from "../selectors/thermoSelector";
/**
 * Every 2 second spawn a saga and try to fetch temperature
 * Race between failure and 2 sec delay. if failed first- run another fetch.
 * if timeout was done- run another fetch (after 2 seconds)
 */
export function* temperatureUpdater() {
  while (true) {
    yield fork(fetchTemperatureLogic);
    yield race({
      fetchComplete: take([fetchTemperatureFailed.type]),
      timeout: delay(2000)
    });
  }
}

export function* retryFetchTemperature() {
  // wait till update completed
  yield take([changeTemperatureCompleted.type, changeTemperatureFailed.type]);
  // take a bit of time, maybe user started to change again
  yield delay(100);
  //try again to fetch temperature
  yield call(fetchTemperatureLogic);
}

/**
 * Try to fetch temperature and if failed, try again
 * if there is update to set point, wait until it is finished and then run
 * return type any, because of Sagas
 */
export function* fetchTemperatureLogic(): any {
  const updateStatus: statusRequests = yield select(setTemperatureStatus);
  if (updateStatus === "FETCHING") {
    yield call(retryFetchTemperature);
  } else {
    const [response]: ApiResponseTypes[] = yield all([
      call(thermostatService.fetchTemperature),
      put(fetchTemperatureStarted({}))
    ]);
    const { message } = response as ClientMessage;
    const { status } = response as ServerStatus;
    if (status === 202 || message) {
      const clientSyncTime = new Date().getTime();
      yield put(fetchTemperatureFailed({ clientSyncTime }));
      if (message) {
        yield put(errorMessage({ message }));
      }
    } else {
      // And again before changing the temperature, lets check that there are no updates in the middle
      const newerUpdateStatus: State["thermostat"]["setTemperatureStatus"] = yield select(
        setTemperatureStatus
      );
      if (newerUpdateStatus === "COMPLETED") {
        yield put(fetchTemperatureCompleted({ ...(response as IDataType) }));
        yield put(errorMessage({ message: "" }));
      }
    }
  }
}

const MAX_TEMPERATURE_SET_POINT = 30;
const MIN_TEMPERATURE_SET_POINT = 15;
const TICK = 0.5;

export function* changeRoomTemperature({
  type
}: {
  type: "RAISE_TEMPERATURE" | "REDUCE_TEMPERATURE";
}) {
  //first thing check if we can change the current temperature (with limitation I've added)
  const currentSetpoint = yield select((state: State) => {
    return state.thermostat.currentSetpoint;
  });
  let changeSetpoint = 0;
  switch (type) {
    case "RAISE_TEMPERATURE":
      if (currentSetpoint + TICK > MAX_TEMPERATURE_SET_POINT) {
        // stop saga, cancel request
        return;
      }
      changeSetpoint = currentSetpoint + TICK;
      yield put(changeSetpointTemperature({ currentSetpoint: changeSetpoint }));
      break;
    case "REDUCE_TEMPERATURE":
      if (currentSetpoint - TICK < MIN_TEMPERATURE_SET_POINT) {
        // stop saga, cancel request
        return;
      }
      changeSetpoint = currentSetpoint - TICK;
      yield put(changeSetpointTemperature({ currentSetpoint: changeSetpoint }));
      break;
  }
}

/**
 * Set the temperature in the server and then update the store if it succeed or not
 * @param currentSetpoint
 */
export function* patchSetPointTemperature({
  payload: { currentSetpoint }
}: ReturnType<typeof changeSetpointTemperature>) {
  const response: ClientMessage | ServerStatus = yield call(
    thermostatService.setTemperature,
    currentSetpoint
  );
  const { status } = response as ServerStatus;
  const { message } = response as ClientMessage;
  if (status === 204) {
    yield put(changeTemperatureCompleted({}));
    yield put(errorMessage({ message: "" })); // clear old message if we have a connection
  } else {
    if (message) {
      yield put(errorMessage({ message }));
    }
    yield put(changeTemperatureFailed({}));
  }
}
