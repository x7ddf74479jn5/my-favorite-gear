import "firebase/auth";
import "firebase/firestore";

import firebase from "firebase/app";

import firebaseConfig from "./firebase-config";

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const isEmulating = window.location.hostname === "localhost";
  if (isEmulating) {
    firebase.auth().useEmulator("http://localhost:9099");
    firebase.firestore().useEmulator("localhost", 8080);
  }
};
