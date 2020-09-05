import React from "react";
import renderer from "react-test-renderer";
import {ThermostatMessage} from "../thermostatMessage";

test("test message display for correct message", () => {
  const message = "Some bad error";
  const rendered = renderer.create(
      <ThermostatMessage message={message} />
  );
  const renderJson = rendered.toJSON();
  // @ts-ignore
  expect(renderJson.children[2]).toEqual(message);

});
test("test message display snapshot", () => {
  const message = "Some bad error";
  const rendered = renderer.create(
      <ThermostatMessage message={message} />
  );
  expect(rendered).toMatchSnapshot();
});
