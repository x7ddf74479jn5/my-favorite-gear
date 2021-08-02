import { FirebaseContext } from "contexts";
import firebase from "firebase";
import { useContext, useEffect, useRef, useState } from "react";
import { collectionName } from "services/constants";
import type { FavoriteList } from "services/models/favoriteList";
import { blankFavoriteList } from "services/models/favoriteList";
import type { Gear } from "services/models/gear";

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

  const firebaseRef = useRef(useContext(FirebaseContext));
  const optionsRef = useRef({ ...defaultOptions, ...options });

  useEffect(() => {
    if (!optionsRef.current.id) return;
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.favoriteLists)
      .doc(optionsRef.current.id);

    const load = async () => {
      setLoading(true);
      try {
        const snap = await query.get();
        const favoriteListData = {
          ...blankFavoriteList,
          ...(snap.data() as FavoriteList),
          id: snap.id,
        };
        setFavoriteList(favoriteListData);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    load();
  }, []);

  const addGear = async (gear: Gear) => {
    if (!optionsRef.current.id) return;
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.favoriteLists)
      .doc(optionsRef.current.id);

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
      await query.set({
        gears: newFavoriteList.gears,
        gearsCount: newFavoriteList.gears.length,
        image: optionsRef.current.image,
        twitterId: optionsRef.current.twitterId,
        updatedAt: firebase.firestore.Timestamp.now(),
      });
      setFavoriteList(newFavoriteList);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const removeGear = async (gear: Gear) => {
    if (!optionsRef.current.id) return;
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.favoriteLists)
      .doc(optionsRef.current.id);

    setLoading(true);
    try {
      const newFavoriteList = {
        ...favoriteList,
        gears: favoriteList.gears.filter((favoriteListGear) => {
          return favoriteListGear !== gear;
        }),
      };
      await query.set({
        gears: newFavoriteList.gears,
        gearsCount: newFavoriteList.gears.length,
        image: optionsRef.current.image,
        twitterId: optionsRef.current.twitterId,
        updatedAt: firebase.firestore.Timestamp.now(),
      });
      setFavoriteList(newFavoriteList);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const upGear = async (gear: Gear) => {
    if (!optionsRef.current.id) return;
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.favoriteLists)
      .doc(optionsRef.current.id);
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
      await query.set({
        gears: newFavoriteList.gears,
        gearsCount: newFavoriteList.gears.length,
        image: optionsRef.current.image,
        twitterId: optionsRef.current.twitterId,
        updatedAt: firebase.firestore.Timestamp.now(),
      });
      setFavoriteList(newFavoriteList);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  const downGear = async (gear: Gear) => {
    if (!optionsRef.current.id) return;
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.favoriteLists)
      .doc(optionsRef.current.id);
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
      await query.set({
        gears: newFavoriteList.gears,
        gearsCount: newFavoriteList.gears.length,
        image: optionsRef.current.image,
        twitterId: optionsRef.current.twitterId,
        updatedAt: firebase.firestore.Timestamp.now(),
      });
      setFavoriteList(newFavoriteList);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

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
