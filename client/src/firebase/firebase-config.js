import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDDJxS8sLOcRXHyPuLRVTYEXL6sTCpAvXY",
    authDomain: "vacceos-liga.firebaseapp.com",
    databaseURL: "https://vacceos-liga-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vacceos-liga",
    storageBucket: "vacceos-liga.appspot.com",
    messagingSenderId: "1074131314057",
    appId: "1:1074131314057:web:cefb86d89630aa4e2cad58"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {
      firebase
  }