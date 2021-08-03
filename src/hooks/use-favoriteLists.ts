import { FirebaseContext } from "contexts";
import { useContext, useEffect, useRef, useState } from "react";
import { collectionName } from "services/constants";
import type { FavoriteList } from "services/models/favoriteList";

type FavoriteListsOptions = {
  limit?: number;
  orderbyColumn?: string;
};
const defaultOptions: Required<FavoriteListsOptions> = {
  limit: 30,
  orderbyColumn: "updatedAt",
};

const useThreads = (options?: FavoriteListsOptions) => {
  const [favoriteLists, setFavoriteLists] = useState<FavoriteList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));
  const optionsRef = useRef({ ...defaultOptions, ...options });

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.favoriteLists)
      .where("gearsCount", "==", 8)
      .orderBy(optionsRef.current.orderbyColumn, "desc")
      .limit(optionsRef.current.limit);

    const load = async () => {
      setLoading(true);
      try {
        const snap = await query.get();
        const favoriteListsData = snap.docs.map((doc) => {
          return {
            ...(doc.data() as FavoriteList),
            id: doc.id,
          };
        });
        setFavoriteLists(favoriteListsData);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, []);

  return { favoriteLists, loading, error };
};

export default useThreads;
