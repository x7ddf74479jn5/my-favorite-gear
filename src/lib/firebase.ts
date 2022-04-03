import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const isEmulating = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

let firestore: ReturnType<typeof getFirestore>;

export const useAuth = () => {
  const auth = getAuth(app);
  if (isEmulating()) {
    connectAuthEmulator(auth, "http://localhost:9099");
  }
  return auth;
};

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore();
    if (isEmulating()) {
      connectFirestoreEmulator(firestore, "localhost", 8080);
    }
  }
  return firestore;
};
