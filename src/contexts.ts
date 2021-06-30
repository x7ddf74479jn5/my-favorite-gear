/* eslint-disable @typescript-eslint/no-explicit-any */
import type firebase from "firebase/app";
import { createContext } from "react";
import type { User } from "services/models/user";

type FirebaseContextValue = {
  auth: firebase.auth.Auth | null;
  db: firebase.firestore.Firestore | null;
};

export const FirebaseContext = createContext<FirebaseContextValue>({
  auth: null,
  db: null,
});

type UserContextValue = {
  user: User | null;
  credential: firebase.auth.UserCredential | null;
  setCredential: (credential: firebase.auth.UserCredential | null) => void;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  credential: null,
  setCredential: () => {
    return undefined;
  },
});
