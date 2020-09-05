import type {ApiResponseTypes, IDataType, ClientMessage, ServerStatus} from "../types/thermoTypes";

class ThermostatService {
  constructor() {
    this.setTemperature = this.setTemperature.bind(this);
    this.fetchTemperature = this.fetchTemperature.bind(this);
  }
  public async fetchTemperature() : Promise<ApiResponseTypes> {
    try {
      const response  = await fetch("http://localhost:9090");
      const {status} = response;
      if (status === 202) {
        return response;
      }
      let data: IDataType = await response.json();
      return {...data, status};
    } catch {
      return { message: "Could not connect to server" };
    }
  }
  public async setTemperature(currentSetpoint: number): Promise<ClientMessage | ServerStatus> {
    try {
      const response : ServerStatus  = await fetch("http://localhost:9090", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ currentSetpoint }) // body data type must match "Content-Type" header
      });
      if (response.status === 204) {
        return response;
      } else {
        return { message: "Could not connect to server" };
      }
    } catch {
      return { message: "Could not connect to server" };
    }
  }
}
export const thermostatService = new ThermostatService();
