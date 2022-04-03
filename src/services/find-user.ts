import type { Firestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import { collectionName } from "./constants";
import type { User } from "./models/user";
import { assertUser } from "./models/user";

const findUser = async (db: Firestore, id: string) => {
  let theUser: User | null = null;
  const userDocRef = doc(db, collectionName.users, id);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const user = userDoc.data();
    assertUser(user);
    theUser = { ...user, id: userDoc.id };
  }

  return theUser;
};

export default findUser;
