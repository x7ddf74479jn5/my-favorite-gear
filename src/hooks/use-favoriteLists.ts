import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useContext, useRef, useState } from "react";

import { FirebaseContext } from "@/contexts";
import { useMountedFn } from "@/hooks/use-mountedFn";
import { collectionName } from "@/services/constants";
import type { FavoriteList } from "@/services/models/favoriteList";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));
  const optionsRef = useRef({ ...defaultOptions, ...options });

  useMountedFn(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const collectionRef = collection(db, collectionName.favoriteLists);
    const q = query(
      collectionRef,
      where("gearsCount", "==", 8),
      orderBy(optionsRef.current.orderbyColumn, "desc"),
      limit(optionsRef.current.limit)
    );
    const load = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(q);
        const favoriteListsData = snap.docs.map((doc) => {
          return {
            ...(doc.data() as FavoriteList),
            id: doc.id,
          };
        });
        setFavoriteLists(favoriteListsData);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
      setLoading(false);
    };

    load();
  });

  return { favoriteLists, loading, error };
};

export default useThreads;
