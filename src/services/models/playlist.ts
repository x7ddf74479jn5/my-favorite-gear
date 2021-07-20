import type firebase from "firebase";
import type { Song } from "services/models/song";

export type Playlist = {
  id?: string;
  twitterId: string;
  image: string | null;
  songs: Song[];
  songsCount: number;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankPlaylist: Playlist = {
  id: "",
  twitterId: "",
  image: null,
  songs: [],
  songsCount: 0,
  updatedAt: null,
};
