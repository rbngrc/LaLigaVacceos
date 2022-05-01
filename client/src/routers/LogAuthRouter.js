import React from "react";
import {
  BrowserRouter as Fragment,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { LoginScreen } from "../components/log_reg_screen/LoginScreen";
import { RegisterScreen } from "../components/log_reg_screen/RegisterScreen";


export const LogAuthRouter = () => {
    return (
        <Fragment>

            <Switch>       
                <Route 
                    exact path="/login" 
                    component={LoginScreen} 
                />
                <Route 
                    exact path="/signin" 
                    component={RegisterScreen} 
                />
                
                <Redirect to="/login" />
            </Switch>

        </Fragment>
    )
}