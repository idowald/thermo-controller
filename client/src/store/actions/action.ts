import actionCreatorFactory, { ActionCreator } from "typescript-fsa";
import type {ClientMessage} from "../types/thermoTypes";
const factory = actionCreatorFactory();

const createAction = <T>(type: string): ActionCreator<T> => {
  const actionCreator = factory<T>(type);
  actionCreator.toString = () => type;
  return actionCreator;
};

export const errorMessage = createAction<ClientMessage>("ERROR_MESSAGE");
export const setPristine = createAction<{}>("SET_PRISTINE");

