import React from "react";
import renderer from "react-test-renderer";
import { ThermostatController } from "../thermostatController";


test("test thermo controller for snapshot", () => {
  const rendered = renderer.create(
    <ThermostatController
      reduceTemperature={() => {}}
      raiseTemperature={() => {}}
    />
  );
  expect(rendered).toMatchSnapshot();
});
