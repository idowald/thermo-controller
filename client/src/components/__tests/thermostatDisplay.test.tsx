import React from "react";
import renderer from "react-test-renderer";
import {ThermostatDisplay} from "../thermostatDisplay";

test("test thermo display for correct numbers", () => {
  const timestamp = new Date().getTime();
  const currentSetpoint = 26.31;
  const currentTemp =22.31;
  const rendered = renderer.create(
    <ThermostatDisplay timestamp={timestamp} currentSetpoint={currentSetpoint} currentTemp={22.31} />
  );
  const renderJson = rendered.toJSON();
  // @ts-ignore
  expect(renderJson.children[0].children[4]).toEqual(currentTemp.toString());
  // @ts-ignore
  expect(renderJson.children[1].children[2]).toEqual(currentSetpoint.toString());

});
test("test thermo display snapshot", () => {
  const timestamp = new Date(1232224).getTime();
  const currentSetpoint = 26.31;
  const currentTemp =22.31;
  const rendered = renderer.create(
      <ThermostatDisplay timestamp={timestamp} currentSetpoint={currentSetpoint} currentTemp={22.31} />
  );
  expect(rendered).toMatchSnapshot();
});
