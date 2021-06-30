import { FirebaseContext } from "contexts";
import { useContext, useEffect, useRef, useState } from "react";
import { collectionName } from "services/constants";
import type { Playlist } from "services/models/playlist";

type PlaylistsOptions = {
  limit?: number;
  orderbyColumn?: string;
};
const defaultOptions: Required<PlaylistsOptions> = {
  limit: 30,
  orderbyColumn: "updatedAt",
};

const useThreads = (options?: PlaylistsOptions) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));
  const optionsRef = useRef({ ...defaultOptions, ...options });

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.playlists)
      .where("songsCount", "==", 8)
      .orderBy(optionsRef.current.orderbyColumn, "desc")
      .limit(optionsRef.current.limit);

    const load = async () => {
      setLoading(true);
      try {
        const snap = await query.get();
        const playlistsData = snap.docs.map((doc) => {
          return {
            ...(doc.data() as Playlist),
            id: doc.id,
          };
        });
        setPlaylists(playlistsData);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, []);

  return { playlists, loading, error };
};

export default useThreads;
