import type { Auth, UserCredential } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { createContext } from "react";

import type { User } from "@/services/models/user";

export type FirebaseContextValue = {
  auth: Auth | null;
  db: Firestore | null;
  isLoading: boolean;
};

export const FirebaseContext = createContext<FirebaseContextValue>({
  auth: null,
  db: null,
  isLoading: false,
});

export type UserContextValue = {
  user: User | null;
  credential: UserCredential | null;
  setCredential: (credential: UserCredential | null) => void;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  credential: null,
  setCredential: () => {
    return undefined;
  },
});
