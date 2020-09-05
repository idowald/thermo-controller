import { connect } from "react-redux";
import type {State} from "../store/reducers/reducer";
import {ThermostatMessage} from "../components/thermostatMessage";


export const ThermostatMessageContainer = connect(
  ({ thermostat: { message } }: State) => ({ message })
)(ThermostatMessage);
