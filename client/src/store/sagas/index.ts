import { debounce, all, fork, takeEvery } from "redux-saga/effects";
import { setPristine } from "../actions/action";
import {
  changeSetpointTemperature,
  raiseTemperature,
  reduceTemperature
} from "../actions/thermostat";

import {
  changeRoomTemperature,
  patchSetPointTemperature,
  temperatureUpdater
} from "./thermo";

function* setPristineSaga() {
  // put anything you want to init here
  yield fork(temperatureUpdater);
}

export default function* root() {
  yield all([
    yield takeEvery(setPristine.type, setPristineSaga),
    yield takeEvery(
      [raiseTemperature.type, reduceTemperature.type],
      changeRoomTemperature
    ),
    yield debounce(
      1000,
      changeSetpointTemperature.type,
      patchSetPointTemperature
    )
  ]);
}
