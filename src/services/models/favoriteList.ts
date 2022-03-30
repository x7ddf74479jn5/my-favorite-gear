import { Timestamp } from "firebase/firestore";

import type { Gear } from "@/services/models/gear";
import { assertGear } from "@/services/models/gear";

export type FavoriteList = {
  id?: string;
  twitterId: string;
  image: string | null;
  gears: Gear[];
  gearsCount: number;
  updatedAt: Timestamp | null;
};

export const blankFavoriteList: FavoriteList = {
  id: "",
  twitterId: "",
  image: null,
  gears: [],
  gearsCount: 0,
  updatedAt: null,
};

export const assertFavoriteList: (
  data: unknown
) => asserts data is FavoriteList = (data) => {
  const d = data as Partial<FavoriteList>;
  const validate = () => {
    if (d.id) {
      return typeof d.id === "string";
    }
    if (!(typeof d.twitterId === "string")) {
      return false;
    }
    if (d.image) {
      return typeof d.image === "string";
    }
    if (!(typeof d.gearsCount === "number")) {
      return false;
    }
    if (d.updatedAt) {
      return d.updatedAt instanceof Timestamp;
    }
    d.gears?.forEach((gear) => assertGear(gear));
  };
  if (!validate()) {
    throw new Error("data is not FavoriteList type");
  }
};
