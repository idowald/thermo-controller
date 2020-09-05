import { changeSetpointTempReducers, initialState } from "../reducer";


test("check that changeSetpointTempReducers is doing a bit saga logic", () => {
  const newState = changeSetpointTempReducers(initialState.thermostat, {
    currentSetpoint: 22
  });
  expect(newState.setTemperatureStatus).toEqual("FETCHING");
  expect(newState.currentSetpoint).toEqual(22);
});

