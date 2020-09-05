import { connect } from "react-redux";
import type { State } from "../store/reducers/reducer";
import {
  raiseTemperature,
  reduceTemperature
} from "../store/actions/thermostat";
import {
  Props,
  ThermostatController
} from "../components/thermostatController";

export const ThermostatControllerContainer = connect<State, Props>(
  null,
  dispatch => ({
    raiseTemperature: () => dispatch(raiseTemperature({ payload: {} })),
    reduceTemperature: () => dispatch(reduceTemperature({ payload: {} }))
  })
)(ThermostatController);
