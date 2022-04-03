import type { User, UserCredential } from "firebase/auth";
import { getAdditionalUserInfo } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { increment, serverTimestamp } from "firebase/firestore";
import { getDoc, writeBatch } from "firebase/firestore";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import isEmpty from "lodash.isempty";

import { collectionName } from "./constants";
import type { User as TheUser } from "./models/user";
import { assertUser, blankUser } from "./models/user";

const writeUser = async (
  db: Firestore,
  firebaseUser: User,
  credential: UserCredential
) => {
  const id = firebaseUser.uid;
  const { displayName } = firebaseUser;
  const photoUrl = firebaseUser.photoURL;
  let providerUid = "";
  let screenName = "";
  let description = "";
  const additionalUserInfo = getAdditionalUserInfo(credential);

  if (additionalUserInfo) {
    if (additionalUserInfo.username) {
      screenName = additionalUserInfo.username;
    }
    if (additionalUserInfo.profile) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      providerUid = (additionalUserInfo.profile as any).id_str;
      description = (additionalUserInfo.profile as any).description || "";
      /* eslint-enable */
    }
  }

  if (!providerUid || !screenName) {
    throw new Error("Invalid credential information.");
  }
  // resolve screenname duplication
  const userCollectionRef = collection(db, collectionName.users);
  const snap = await getDocs(
    query(userCollectionRef, where("screenName", "==", screenName))
  );
  if (snap.size > 0) {
    const rnd = Math.floor(Math.random() * 10000);
    screenName = `${screenName}${rnd.toString().padStart(4, "0")}`;
  }
  let theUser: TheUser | null = null;

  const batch = writeBatch(db);
  const userDoc = await getDoc(doc(db, collectionName.users, id));
  if (userDoc.exists()) {
    const user = userDoc.data();
    assertUser(user);
    const diff: Partial<TheUser> = {};
    if (user.description !== description) {
      diff.description = description;
    }
    if (user.displayName !== displayName) {
      diff.displayName = displayName;
    }
    if (user.photoUrl !== photoUrl) {
      diff.photoUrl = photoUrl;
    }
    if (!isEmpty(diff)) {
      batch.update(userDoc.ref, {
        ...diff,
        updatedAt: serverTimestamp(),
      });
    }
    theUser = { ...user, ...diff, id: userDoc.id };
  } else {
    const user: TheUser = {
      ...blankUser,
      providerUid,
      screenName,
      displayName,
      description,
      photoUrl,
    };
    batch.set(userDoc.ref, {
      ...user,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    theUser = { ...user, id: userDoc.id };
    const counterDoc = doc(
      db,
      collectionName.docCounters,
      collectionName.users
    );
    batch.set(
      counterDoc,
      {
        count: increment(1),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }
  await batch.commit();

  return theUser;
};

export default writeUser;
