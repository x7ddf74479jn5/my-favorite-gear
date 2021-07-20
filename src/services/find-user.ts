import type firebase from "firebase";

import { collectionName } from "./constants";
import type { User } from "./models/user";

const findUser = async (db: firebase.firestore.Firestore, id: string) => {
  let theUser: User | null = null;
  const userDoc = await db.collection(collectionName.users).doc(id).get();

  if (userDoc.exists) {
    const user = userDoc.data() as User;
    theUser = { ...user, id: userDoc.id };
  }

  return theUser;
};

export default findUser;
