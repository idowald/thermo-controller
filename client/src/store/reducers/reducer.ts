import { combineReducers } from "redux";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
  changeSetpointTemperature,
  changeTemperatureCompleted,
  changeTemperatureFailed,
  fetchTemperatureCompleted,
  fetchTemperatureFailed,
  fetchTemperatureStarted
} from "../actions/thermostat";
import { IDataType, TemperatureStatus } from "../types/thermoTypes";
import { ClientTimestamp } from "../types/thermoTypes";
import { errorMessage } from "../actions/action";

export type statusRequests = "FETCHING" | "COMPLETED" | "FAILED";

// I used null timestamp in the client state only but not in the data from server, to make stuff easier
export type thermostatClient = Omit<IDataType, "timestamp"> & {
  timestamp: number | null;
};
export interface State {
  thermostat: thermostatClient & TemperatureStatus;
}

export const initialState: State = {
  thermostat: {
    currentTemp: 0,
    currentSetpoint: 0,
    timestamp: null,
    setTemperatureStatus: "COMPLETED",
    fetchTemperatureStatus: "COMPLETED",
    message: ""
  }
};

export const changeSetpointTempReducers = (
  state: State["thermostat"],
  { currentSetpoint }: Pick<IDataType, "currentSetpoint">
): State["thermostat"] => ({
  ...state,
  setTemperatureStatus: "FETCHING",
  currentSetpoint
});
const thermoReducer = reducerWithInitialState(initialState.thermostat)
  .case(changeTemperatureCompleted, state => {
    return { ...state, setTemperatureStatus: "COMPLETED" };
  })
  .case(changeTemperatureFailed, state => {
    return { ...state, setTemperatureStatus: "FAILED" };
  })
  .case(changeSetpointTemperature, changeSetpointTempReducers)
  .case(fetchTemperatureCompleted, (state, thermostat: IDataType) => ({
    ...state,
    ...thermostat,
    fetchTemperatureStatus:
      state.timestamp === null || thermostat.timestamp > state.timestamp
        ? "COMPLETED"
        : state.fetchTemperatureStatus
  }))
  .case(
    fetchTemperatureFailed,
    (state, { clientSyncTime }: ClientTimestamp) => {
      return {
        ...state,
        fetchTemperatureStatus:
          state.timestamp === null || clientSyncTime > state.timestamp
            ? "FAILED"
            : state.fetchTemperatureStatus
      };
    }
  )
  .case(fetchTemperatureStarted, state => ({
    ...state,
    fetchTemperatureStatus: "FETCHING"
  }))
  .case(errorMessage, (state, { message }) => ({ ...state, message }))
  .build();

export const reducer = combineReducers<State>({
  thermostat: thermoReducer
});
