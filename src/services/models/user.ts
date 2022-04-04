import type { FieldValue } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export type User = {
  id?: string;
  screenName: string;
  displayName: string | null;
  description: string | null;
  photoUrl: string | null;
  provider: string;
  providerUid: string;
  createdAt: FieldValue | null;
  updatedAt: FieldValue | null;
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

export const assertUser: (data: unknown) => asserts data is User = (data) => {
  const d = data as Partial<User>;
  const validate = () => {
    if (d.id) {
      return typeof d.id === "string";
    }
    if (!(typeof d.screenName === "string")) {
      return false;
    }
    if (d.displayName) {
      return typeof d.displayName === "string";
    }
    if (d.description) {
      return typeof d.description === "string";
    }
    if (d.photoUrl) {
      return typeof d.photoUrl === "string";
    }
    if (!(d.provider === "twitter")) {
      return false;
    }
    if (!(typeof d.providerUid === "string")) {
      return false;
    }
    if (d.createdAt) {
      return d.createdAt instanceof Timestamp;
    }
    if (d.updatedAt) {
      return d.updatedAt instanceof Timestamp;
    }
  };
  if (!validate()) {
    throw new Error("data is not User type");
  }
};
