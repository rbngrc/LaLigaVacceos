import React, { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Axios from 'axios';

import { LogAuthRouter } from "./LogAuthRouter";
import { DasboardRoutes } from './DashboardRoutes';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
// import { LoadingScreen } from '../components/ui/LoadingScreen'


export const AppRouter = () => {

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      Axios.get('http://localhost:3306/atletas').then((response) => {
        if (response?.email) {
          setIsLoggedIn(true);
      } else {
          setIsLoggedIn(false);
      }

      setChecking(false);
      });
}, [setChecking,setIsLoggedIn])
  

  // if (checking) {
  //     return (
  //         <LoadingScreen />
  //     )
  // }  
  return (
    <Router>
        <div>
        <Switch>       
            <PublicRoute
                isAuthenticated={isLoggedIn}
                path="/login" 
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
