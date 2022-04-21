import React, { useState,useEffect } from 'react';
import { useDispatch } from "react-redux";


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
    <div>
        
    </div>
  )
}
