import { connect } from "react-redux";
import type { State } from "../store/reducers/reducer";
import { ThermostatDisplay } from "../components/thermostatDisplay";

export const ThermostatDisplayContainer = connect(
  ({
    thermostat: {
      setTemperatureStatus,
      fetchTemperatureStatus,
      message,
      ...rest
    }
  }: State) => ({ ...rest })
)(ThermostatDisplay);
