import { Request, Response } from 'express';

interface IDataType {
	currentTemp: number;
	currentSetpoint: number;
	timestamp: number | null;
}

let customData: IDataType = {
	currentSetpoint: 16.5,
	currentTemp: 15.0,
	timestamp: null
};

class ThermostatController {
	public static fetch = async (req: Request, res: Response) => {
		if (Math.random() < 0.2) {
			// once in a while change the current temp towards the set point, and i use only the first 0.x number
			customData.currentTemp =
				Math.round((customData.currentTemp + (customData.currentSetpoint - customData.currentTemp) / 2) * 10 ) / 10;
			if (Math.abs(customData.currentSetpoint - customData.currentTemp) < 0.5) {
				customData.currentTemp = customData.currentSetpoint;
			}
		}
		customData = { ...customData, timestamp: Date.now() };
		if (Math.random() < 0.5) {
			return res.status(202).send();
		}
		res.send(customData);
	}

	public static update = async (req: Request, res: Response) => {
		return setTimeout(() => {
			customData = {
				...customData,
				currentSetpoint: req.body.currentSetpoint,
				timestamp: Date.now()
			};
			res.status(204).send();
		}, 1000);
	}
}

export default ThermostatController;
