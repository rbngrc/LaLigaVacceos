import React, { useState,useEffect } from 'react';
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { firebase } from "../firebase/firebase-config"

import { LogAuthRouter } from "./LogAuthRouter";
import { DasboardRoutes } from "./DasboardRoutes";
import { LoadingScreen } from "../components/ui/LoadingScreen"

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async(user) => {
        if (user?.uid) {
            dispatch(login(user.uid, user.displayName));
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        setChecking(false);

    });
}, [dispatch, setChecking, setIsLoggedIn])
  

  if (checking) {
      return (
          <LoadingScreen />
      )
  }  
  return (
    <Router>
        <div>
        <Switch>       
            <PublicRoute
                isAuthenticated={isLoggedIn}
                path="/auth" 
                component={LogAuthRouter} 
            />

            <PrivateRoute
                isAuthenticated={isLoggedIn} 
                path="/" 
                component={DasboardRoutes}
            />
        </Switch>
        </div>
    </Router>
)
}
