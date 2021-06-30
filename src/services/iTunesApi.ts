import axios from "axios";
import type { Song } from "services/models/song";

interface ApiConfig {
  baseURL?: string;
  timeout?: number;
  term?: string;
  country?: string;
  media?: string;
  entity?: string;
  limit?: number;
  lang?: string;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: "https://itunes.apple.com",
  timeout: 7000,
  term: "",
  country: "JP",
  media: "music",
  entity: "song",
  limit: 20,
  lang: "ja_jp",
};

export const getSongsFactory = (optionConfig?: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
  });

  const getSongs = async () => {
    const response = await instance.get(
      `/search?term=${encodeURI(config.term ? config.term : "")}&country=${
        config.country
      }&media=${config.media}&limit=${config.limit}&entity=${
        config.entity
      }&lang=${config.lang}`
    );

    if (response.status !== 200) {
      const songs: Song[] = [];
      return songs;
    }
    const songs: Song[] = response.data.results;
    return songs.map((song) => {
      return {
        ...song,
        artworkUrl600: song.artworkUrl100
          ? song.artworkUrl100.replace("100x100", "600x600")
          : null,
      };
    });
  };

  return getSongs;
};
