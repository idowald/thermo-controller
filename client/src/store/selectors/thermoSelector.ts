import type { State } from "../reducers/reducer";

export const setTemperatureStatus = (state: State) => {
  return state.thermostat.setTemperatureStatus;
};
