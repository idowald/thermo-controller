import { call, select, put } from "@redux-saga/core/effects";
import {changeRoomTemperature, fetchTemperatureLogic, retryFetchTemperature} from "../thermo";
import { setTemperatureStatus } from "../../selectors/thermoSelector";
import {changeSetpointTemperature} from "../../actions/thermostat";

it("Test thermo saga logic", () => {
  const gen = fetchTemperatureLogic();
  expect(gen.next().value).toEqual(select(setTemperatureStatus));
  const nextSaga = gen.next(
    "FETCHING" );
  //check that the sagas try re-fetching
  expect(nextSaga.value).toEqual(call(retryFetchTemperature));

});

it("Test changeRoomTemperature saga logic", () => {
  const gen = changeRoomTemperature({type :"RAISE_TEMPERATURE"});
  gen.next(); // jump to next saga
  const currentSetpoint = 25;
  const changeSetpoint = gen.next(currentSetpoint); // currentSetpoint will be 25
  expect(changeSetpoint.value).toEqual(put(changeSetpointTemperature({ currentSetpoint: currentSetpoint + 0.5 })));
});

it("Test changeRoomTemperature saga logic- way too high temperature", () => {
  const gen = changeRoomTemperature({type :"RAISE_TEMPERATURE"});
  gen.next(); // jump to next saga
  const currentSetpoint = 30;
  const changeSetpoint = gen.next(currentSetpoint);
  expect(gen.next().done).toEqual(true);

});
