import type {statusRequests} from "../reducers/reducer";

export type ClientTimestamp = {
    clientSyncTime: number;
};
export type IDataType = {
  currentTemp: number;
  currentSetpoint: number;
  timestamp: number;
};
export type ClientMessage = { message: "Could not connect to server" | "" };
export type ServerStatus = { status: number };
export type ApiResponseTypes = ServerStatus | IDataType | ClientMessage ;

export type TemperatureStatus = {
    setTemperatureStatus: statusRequests;
    fetchTemperatureStatus: statusRequests;
} & ClientMessage;
