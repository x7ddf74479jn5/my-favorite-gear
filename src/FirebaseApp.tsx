import type { UserCredential } from "firebase/auth";
import { getRedirectResult } from "firebase/auth";
import type { FC } from "react";
import React, { useEffect, useRef, useState } from "react";

import { FirebaseContext, UserContext } from "@/contexts";
import { useAuth, useFirestore } from "@/lib/firebase";
import findUser from "@/services/find-user";
import type { User } from "@/services/models/user";
import writeUser from "@/services/write-user";

const FirebaseApp: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [credential, setCredential] = useState<UserCredential | null>(null);
  const counterRef = useRef(0);
  const mountedRef = useRef(false);
  const auth = useAuth();
  const db = useFirestore();

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

  useEffect(() => {
    if (!mountedRef.current) {
      getRedirectResult(auth).then((authResult) => {
        if (authResult?.user) {
          setCredential(authResult);
        }
      });
      mountedRef.current = true;
    }
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      <UserContext.Provider value={{ user, credential, setCredential }}>
        {children}
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default FirebaseApp;
