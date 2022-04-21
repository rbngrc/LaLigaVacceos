import firebase from "firebase/app";
import"firebase/firestore";
import"firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDJxS8sLOcRXHyPuLRVTYEXL6sTCpAvXY",
    authDomain: "vacceos-liga.firebaseapp.com",
    projectId: "vacceos-liga",
    storageBucket: "vacceos-liga.appspot.com",
    messagingSenderId: "1074131314057",
    appId: "1:1074131314057:web:cefb86d89630aa4e2cad58"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {
    db,
    firebase
}
