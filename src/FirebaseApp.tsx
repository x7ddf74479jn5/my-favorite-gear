import type { UserCredential } from "firebase/auth";
import { getRedirectResult } from "firebase/auth";
import type { FC } from "react";
import { memo } from "react";
import React, { useEffect, useRef, useState } from "react";

import { FirebaseContext, UserContext } from "@/contexts";
import { useMountedFn } from "@/hooks/use-mountedFn";
import { useAuth, useFirestore } from "@/lib/firebase";
import findUser from "@/services/find-user";
import type { User } from "@/services/models/user";
import writeUser from "@/services/write-user";

const FirebaseApp: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [credential, setCredential] = useState<UserCredential | null>(null);
  const counterRef = useRef(0);
  const auth = useAuth();
  const db = useFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setIsLoading(true);
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
      setIsLoading(false);
    });

    if (credential) counterRef.current += 1;

    return () => unsubscribe();
    // don't suppress trigger with using deps to enable counter
  });

  useMountedFn(() =>
    getRedirectResult(auth).then((authResult) => {
      if (authResult?.user) {
        setCredential(authResult);
      }
    })
  );

  return (
    <FirebaseContext.Provider value={{ auth, db, isLoading }}>
      <UserContext.Provider value={{ user, credential, setCredential }}>
        {children}
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default memo(FirebaseApp);
