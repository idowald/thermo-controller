import React from "react";
import { AppBar, createStyles, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThermostatControllerContainer } from "./containers/thermostatControllerContainer";
import { ThermostatDisplayContainer } from "./containers/thermostatDisplayContainer";
import { ThermostatMessageContainer } from "./containers/thermostatMessageContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      margin: "10px"
    },
    appBar: {
      marginBottom: "20px",
      paddingLeft: "10px"
    },
    mainView: {
      boxShadow: "5px 5px 5px 0px #888888",
      borderRadius: "50%",
      background: "#e6e6e6",
      marginTop: "80px",
      width: "300px",
      height: "300px",
      minHeight: "200px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center"
    }
  })
);
function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <AppBar className={classes.appBar}>
        <Typography variant="h2">Thermostat °</Typography>
      </AppBar>
      <div className={classes.mainView}>
        <ThermostatControllerContainer />
        <ThermostatDisplayContainer />
        <ThermostatMessageContainer />
      </div>
    </div>
  );
}

export default App;
