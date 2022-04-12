import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useCallback, useContext, useLayoutEffect, useState } from "react";

import { FirebaseContext } from "@/contexts";
import { collectionName } from "@/services/constants";
import type { FavoriteList } from "@/services/models/favoriteList";
import { blankFavoriteList } from "@/services/models/favoriteList";
import type { Gear } from "@/services/models/gear";

type favoriteListOptions = {
  id?: string;
  image?: string | null;
  twitterId?: string;
};
const defaultOptions = {
  id: "",
  image: null,
  twitterId: "",
};
const useFavoriteList = (options: favoriteListOptions) => {
  const [favoriteList, setFavoriteList] =
    useState<FavoriteList>(blankFavoriteList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebase = useContext(FirebaseContext);
  const finalOptions = { ...defaultOptions, ...options };

  useLayoutEffect(() => {
    if (!finalOptions.id) return;
    const { db } = firebase;
    if (!db) throw new Error("Firestore is not initialized");
    const userDocRef = doc(db, collectionName.favoriteLists, finalOptions.id);
    const load = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(userDocRef);
        const favoriteListData = {
          ...blankFavoriteList,
          ...(snap.data() as FavoriteList),
          id: snap.id,
        };
        setFavoriteList(favoriteListData);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
      setLoading(false);
    };
    load();
  }, [finalOptions.id, firebase]);

  const addGear = useCallback(
    async (gear: Gear) => {
      if (!finalOptions.id) return;
      const { db } = firebase;
      if (!db) throw new Error("Firestore is not initialized");
      const favoriteListsDocRef = doc(
        db,
        collectionName.favoriteLists,
        finalOptions.id
      );
      if (favoriteList.gears.length >= 8) {
        alert("9アイテム以上はお気に入りに登録できません。");
        return;
      }
      setLoading(true);
      try {
        const newFavoriteList = {
          ...favoriteList,
          gears: [...favoriteList.gears, gear],
        };
        await setDoc(favoriteListsDocRef, {
          gears: newFavoriteList.gears,
          gearsCount: newFavoriteList.gears.length,
          image: finalOptions.image,
          twitterId: finalOptions.twitterId,
          updatedAt: Timestamp.now(),
        });
        setFavoriteList(newFavoriteList);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
      setLoading(false);
    },
    [
      favoriteList,
      finalOptions.id,
      finalOptions.image,
      finalOptions.twitterId,
      firebase,
    ]
  );

  const removeGear = useCallback(
    async (gear: Gear) => {
      if (!finalOptions.id) return;
      const { db } = firebase;
      if (!db) throw new Error("Firestore is not initialized");

      const favoriteListsDocRef = doc(
        db,
        collectionName.favoriteLists,
        finalOptions.id
      );
      setLoading(true);
      try {
        const newFavoriteList = {
          ...favoriteList,
          gears: favoriteList.gears.filter((favoriteListGear) => {
            return favoriteListGear !== gear;
          }),
        };
        await setDoc(favoriteListsDocRef, {
          gears: newFavoriteList.gears,
          gearsCount: newFavoriteList.gears.length,
          image: finalOptions.image,
          twitterId: finalOptions.twitterId,
          updatedAt: Timestamp.now(),
        });
        setFavoriteList(newFavoriteList);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
      setLoading(false);
    },
    [
      favoriteList,
      finalOptions.id,
      finalOptions.image,
      finalOptions.twitterId,
      firebase,
    ]
  );

  const upGear = useCallback(
    async (gear: Gear) => {
      if (!finalOptions.id) return;
      const { db } = firebase;
      if (!db) throw new Error("Firestore is not initialized");
      const favoriteListDocRef = doc(
        db,
        collectionName.favoriteLists,
        finalOptions.id
      );
      setLoading(true);
      try {
        const index = favoriteList.gears.indexOf(gear);
        const spliced = favoriteList.gears.slice();
        spliced.splice(
          index - 1,
          2,
          favoriteList.gears[index],
          favoriteList.gears[index - 1]
        );
        const newFavoriteList = {
          ...favoriteList,
          gears: spliced,
        };
        await setDoc(favoriteListDocRef, {
          gears: newFavoriteList.gears,
          gearsCount: newFavoriteList.gears.length,
          image: finalOptions.image,
          twitterId: finalOptions.twitterId,
          updatedAt: Timestamp.now(),
        });
        setFavoriteList(newFavoriteList);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
      setLoading(false);
    },
    [
      favoriteList,
      finalOptions.id,
      finalOptions.image,
      finalOptions.twitterId,
      firebase,
    ]
  );

  const downGear = useCallback(
    async (gear: Gear) => {
      if (!finalOptions.id) return;
      const { db } = firebase;
      if (!db) throw new Error("Firestore is not initialized");
      const favoliteListDocRef = doc(
        db,
        collectionName.favoriteLists,
        finalOptions.id
      );
      setLoading(true);
      try {
        const index = favoriteList.gears.indexOf(gear);
        const spliced = favoriteList.gears.slice();
        spliced.splice(
          index,
          2,
          favoriteList.gears[index + 1],
          favoriteList.gears[index]
        );
        const newFavoriteList = {
          ...favoriteList,
          gears: spliced,
        };
        await setDoc(favoliteListDocRef, {
          gears: newFavoriteList.gears,
          gearsCount: newFavoriteList.gears.length,
          image: finalOptions.image,
          twitterId: finalOptions.twitterId,
          updatedAt: Timestamp.now(),
        });
        setFavoriteList(newFavoriteList);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
      setLoading(false);
    },
    [
      favoriteList,
      finalOptions.id,
      finalOptions.image,
      finalOptions.twitterId,
      firebase,
    ]
  );

  return {
    favoriteList,
    loading,
    error,
    addGear,
    removeGear,
    upGear,
    downGear,
  };
};

export default useFavoriteList;
