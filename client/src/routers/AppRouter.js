import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
  } from "react-router-dom";
import { login } from '../actions/auth';
import { firebase } from "../firebase/firebase-config"

import { AuthRouter } from './AuthRouter';
import { DashboardRoutes } from './DashboardRoutes';
import { LoadingScreen } from '../components/ux/LoadingScreen';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setchecking] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async(user) => {
        if (user?.uid) {
          dispatch(login(user.uid, user.displayName));
          setisLoggedIn(true);
        } else {
          setisLoggedIn(false);
        }

        setchecking(false);

    });
  }, [dispatch, setchecking, setisLoggedIn]);

  if (checking) {
    return (
        <LoadingScreen />
    )
  };
  

    return (
      <Router>
          <div>
              <Switch>
                  <PublicRoute
                      isAuthenticated={isLoggedIn}
                      path="/auth"
                      component = { AuthRouter }
                  />
                  <PrivateRoute
                      isAuthenticated={isLoggedIn}
                      path="/"
                      component = { DashboardRoutes }
                  />
              </Switch>
          </div>
      </Router>
    )
}
