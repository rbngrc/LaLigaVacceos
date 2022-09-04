import { types } from "../types/types";
import { firebase } from "../firebase/firebase-config";
import { finishLoading, setError, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.displayEmail));
        dispatch(finishLoading());
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());
        dispatch(setError("El usuario o la contraseña son incorrectos"));
      });
  };
};

export const startRegisterUserPassword = (
  email,
  name,
  nickname,
  password,
  password2,
  sex
) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName, user.displayEmail));
      })
      .catch((e) => {
        console.log(e);
        dispatch(setError("Este usuario ya está registrado"));
      });
  };
};

export const login = (uid, displayName, displayEmail) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
      displayEmail,
    },
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
  };
};

const logout = () => ({
  type: types.logout,
});
