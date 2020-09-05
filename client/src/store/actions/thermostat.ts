import actionCreatorFactory, { ActionCreator } from "typescript-fsa";
import type {ClientTimestamp} from "../types/thermoTypes";
import type {IDataType} from "../types/thermoTypes";
const factory = actionCreatorFactory();

const createAction = <T>(type: string): ActionCreator<T> => {
  const actionCreator = factory<T>(type);
  actionCreator.toString = () => type;
  return actionCreator;
};
export const raiseTemperature = createAction<{}>("RAISE_TEMPERATURE");
export const reduceTemperature = createAction<{}>("REDUCE_TEMPERATURE");
export const changeSetpointTemperature = createAction<Pick<IDataType, "currentSetpoint">>("CHANGE_SETPOINT_TEMPERATURE");
export const changeTemperatureCompleted = createAction<{}>(
  "CHANGE_TEMPERATURE_COMPLETED"
);
export const changeTemperatureFailed = createAction<{}>(
    "CHANGE_TEMPERATURE_FAILED"
);
export const fetchTemperatureStarted = createAction<{}>(
    "FETCH_TEMPERATURE_STARTED"
);
export const fetchTemperatureFailed = createAction< ClientTimestamp >(
    "FETCH_TEMPERATURE_FAILED"
);
export const fetchTemperatureCompleted = createAction<IDataType>(
  "FETCH_TEMPERATURE_COMPLETED"
);

