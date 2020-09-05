import * as React from "react";
import { Button, createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
export interface Props {
  raiseTemperature: () => void;
  reduceTemperature: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    flexBox: {
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
      maxWidth: "400px"
    },
  })
);
export const ThermostatController = ({
  raiseTemperature,
  reduceTemperature
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.flexBox}>
      <Button variant="outlined" onClick={raiseTemperature}>+</Button>
      <Button variant="outlined" onClick={reduceTemperature}>-</Button>
    </div>
  );
};
