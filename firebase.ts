import firebase from "firebase";

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
