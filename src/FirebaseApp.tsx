import "firebase/auth";
import "firebase/firestore";

import firebase from "firebase/app";
import type { FC } from "react";
import React, { useEffect, useRef, useState } from "react";
import findUser from "services/find-user";
import type { User } from "services/models/user";
import writeUser from "services/write-user";

import { FirebaseContext, UserContext } from "./contexts";

const FirebaseApp: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [credential, setCredential] =
    useState<firebase.auth.UserCredential | null>(null);
  const counterRef = useRef(0);
  const auth = firebase.auth();
  const db = firebase.firestore();

  const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      if (counterRef.current === 1 && credential) {
        const theUser = await writeUser(db, firebaseUser, credential);
        setUser(theUser);
      } else if (!user) {
        const theUser = await findUser(db, firebaseUser.uid);
        setUser(theUser);
      }
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    if (credential) counterRef.current += 1;

    return unsubscribe;
    // don't suppress trigger with using deps to enable counter
  });

  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      <UserContext.Provider value={{ user, credential, setCredential }}>
        {children}
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default FirebaseApp;
