import React from "react";
import {
  BrowserRouter as Fragment,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";


export const LogAuthRouter = () => {
    return (
        <Fragment>

            <Switch>       
                <Route 
                    exact path="/auth/acceso" 
                    component={LoginScreen} 
                />
                <Route 
                    exact path="/auth/registro" 
                    component={RegisterScreen} 
                />
                
                <Redirect to="/auth/acceso" />
            </Switch>

        </Fragment>
    )
}