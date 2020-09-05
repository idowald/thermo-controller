import * as React from "react";
import type {ClientMessage} from "../store/types/thermoTypes";
import PermScanWifiIcon from '@material-ui/icons/PermScanWifi';
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
    createStyles({
        hidden: {
            visibility: "hidden"
        }
    })
);
export const ThermostatMessage =({message}: ClientMessage | { message: string})=>{
    const classes = useStyles();
    return <div id="thermo-message"><PermScanWifiIcon className={message ? '': classes.hidden}/> {message}</div>
}
