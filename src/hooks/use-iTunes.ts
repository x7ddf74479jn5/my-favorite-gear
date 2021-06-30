import { useState } from "react";
import { getSongsFactory } from "services/iTunesApi";
import type { Song } from "services/models/song";

const useITunes = () => {
  const [iTunesSongs, setITunesSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  const searchSongs = (term: string) => {
    if (term.trim() === "") {
      setITunesSongs([]);
      return;
    }
    setLoading(true);
    const getSongs = getSongsFactory({ term: term });
    getSongs().then((songs) => {
      setITunesSongs(songs);
      setLoading(false);
    });
  };
  return { iTunesSongs, loading, searchSongs };
};

export default useITunes;
