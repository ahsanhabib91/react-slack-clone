import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyARBZ3SahuQGTi-Cum1HQ8RH6aBrv6szl8",
  authDomain: "react-slack-clone-d0fe1.firebaseapp.com",
  databaseURL: "https://react-slack-clone-d0fe1.firebaseio.com",
  projectId: "react-slack-clone-d0fe1",
  storageBucket: "react-slack-clone-d0fe1.appspot.com",
  messagingSenderId: "187392489313"
};
firebase.initializeApp(config);

export default firebase;
