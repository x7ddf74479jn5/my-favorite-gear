import type firebase from "firebase";
import type { Gear } from "services/models/gear";

export type FavoriteList = {
  id?: string;
  twitterId: string;
  image: string | null;
  gears: Gear[];
  gearsCount: number;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankFavoriteList: FavoriteList = {
  id: "",
  twitterId: "",
  image: null,
  gears: [],
  gearsCount: 0,
  updatedAt: null,
};
