import { FirebaseContext } from "contexts";
import firebase from "firebase";
import { useContext, useEffect, useRef, useState } from "react";
import { collectionName } from "services/constants";
import type { Playlist } from "services/models/playlist";
import { blankPlaylist } from "services/models/playlist";
import type { Song } from "services/models/song";

type playlistOptions = {
  id?: string;
  image?: string | null;
  twitterId?: string;
};
const defaultOptions = {
  id: "",
  image: null,
  twitterId: "",
};
const usePlaylist = (options: playlistOptions) => {
  const [playlist, setPlaylist] = useState<Playlist>(blankPlaylist);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));
  const optionsRef = useRef({ ...defaultOptions, ...options });

  useEffect(() => {
    if (!optionsRef.current.id) return;
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.playlists)
      .doc(optionsRef.current.id);

    const load = async () => {
      setLoading(true);
      try {
        const snap = await query.get();
        const playlistData = {
          ...blankPlaylist,
          ...(snap.data() as Playlist),
          id: snap.id,
        };
        setPlaylist(playlistData);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    load();
  }, []);

  const addSong = async (song: Song) => {
    if (!optionsRef.current.id) return;
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.playlists)
      .doc(optionsRef.current.id);

    if (playlist.songs.length >= 8) {
      alert("9曲以上はお気に入りに登録できません。");
      return;
    }
    setLoading(true);
    try {
      const newPlaylist = {
        ...playlist,
        songs: [...playlist.songs, song],
      };
      await query.set({
        songs: newPlaylist.songs,
        songsCount: newPlaylist.songs.length,
        image: optionsRef.current.image,
        twitterId: optionsRef.current.twitterId,
        updatedAt: firebase.firestore.Timestamp.now(),
      });
      setPlaylist(newPlaylist);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const removeSong = async (song: Song) => {
    if (!optionsRef.current.id) return;
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.playlists)
      .doc(optionsRef.current.id);

    setLoading(true);
    try {
      const newPlaylist = {
        ...playlist,
        songs: playlist.songs.filter((playlistSong) => {
          return playlistSong !== song;
        }),
      };
      await query.set({
        songs: newPlaylist.songs,
        songsCount: newPlaylist.songs.length,
        image: optionsRef.current.image,
        twitterId: optionsRef.current.twitterId,
        updatedAt: firebase.firestore.Timestamp.now(),
      });
      setPlaylist(newPlaylist);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const upSong = async (song: Song) => {
    if (!optionsRef.current.id) return;
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.playlists)
      .doc(optionsRef.current.id);
    setLoading(true);
    try {
      const index = playlist.songs.indexOf(song);
      const spliced = playlist.songs.slice();
      spliced.splice(
        index - 1,
        2,
        playlist.songs[index],
        playlist.songs[index - 1]
      );

      const newPlaylist = {
        ...playlist,
        songs: spliced,
      };
      await query.set({
        songs: newPlaylist.songs,
        songsCount: newPlaylist.songs.length,
        image: optionsRef.current.image,
        twitterId: optionsRef.current.twitterId,
        updatedAt: firebase.firestore.Timestamp.now(),
      });
      setPlaylist(newPlaylist);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  const downSong = async (song: Song) => {
    if (!optionsRef.current.id) return;
    const { db } = firebaseRef.current;
    if (!db) throw new Error("Firestore is not initialized");
    const query = db
      .collection(collectionName.playlists)
      .doc(optionsRef.current.id);
    setLoading(true);
    try {
      const index = playlist.songs.indexOf(song);
      const spliced = playlist.songs.slice();
      spliced.splice(
        index,
        2,
        playlist.songs[index + 1],
        playlist.songs[index]
      );
      const newPlaylist = {
        ...playlist,
        songs: spliced,
      };
      await query.set({
        songs: newPlaylist.songs,
        songsCount: newPlaylist.songs.length,
        image: optionsRef.current.image,
        twitterId: optionsRef.current.twitterId,
        updatedAt: firebase.firestore.Timestamp.now(),
      });
      setPlaylist(newPlaylist);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { playlist, loading, error, addSong, removeSong, upSong, downSong };
};

export default usePlaylist;
