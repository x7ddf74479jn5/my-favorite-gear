import type firebase from "firebase";

export type User = {
  id?: string;
  screenName: string;
  displayName: string | null;
  description: string | null;
  photoUrl: string | null;
  provider: string;
  providerUid: string;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankUser: User = {
  screenName: "",
  displayName: null,
  description: null,
  photoUrl: null,
  provider: "twitter",
  providerUid: "",
  createdAt: null,
  updatedAt: null,
};
