export type Song = {
  trackId: string;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string | null;
  artworkUrl600: string | null;
  trackViewUrl: string;
  previewUrl: string | null;
};

export const blankSong: Song = {
  trackId: "",
  trackName: "",
  artistName: "",
  collectionName: "",
  artworkUrl100: null,
  artworkUrl600: null,
  trackViewUrl: "",
  previewUrl: null,
};
