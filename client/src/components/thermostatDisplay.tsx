import * as React from "react";
import { simpleTimeFormat } from "../utils/utils";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FlagIcon from "@material-ui/icons/Flag";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import type {thermostatClient} from "../store/reducers/reducer";
const useStyles = makeStyles(() =>
  createStyles({
    hidden: {
      display: "none"
    },
    thermoDisplay: {
      width: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly"
    },
      spans: {
          display: "flex",
          alignItems: "flex-end",
      }
  })
);
export const ThermostatDisplay = ({
  currentTemp,
  currentSetpoint,
  timestamp
}: thermostatClient) => {
  const classes = useStyles();
  const timeFormat = timestamp? simpleTimeFormat(new Date(timestamp)) : "00:00.00";
  return (
    <div className={classes.thermoDisplay}>
      <span className={classes.spans}>
        <AcUnitIcon className={currentTemp <= 23 ? "" : classes.hidden} />{" "}
        <WhatshotIcon className={currentTemp > 23 ? "" : classes.hidden} />{" "}
        {currentTemp}°
      </span>
      <span className={classes.spans}>
        <FlagIcon /> {currentSetpoint}°{" "}
      </span>
      <span className={classes.spans}>
        <ScheduleIcon />
        {timeFormat}
      </span>
    </div>
  );
};
