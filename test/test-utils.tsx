import { MuiThemeProvider } from "@material-ui/core/styles";
import type Queries from "@testing-library/dom/types/queries";
import type { RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import theme from "asset/theme";
import type { FirebaseContextValue, UserContextValue } from "contexts";
import { FirebaseContext, UserContext } from "contexts";
import firebase from "firebase/app";
import React from "react";
import type { User } from "services/models/user";

import { initializeFirebase } from "../firebase";

initializeFirebase();

export const correctUserData: User = {
  screenName: "screenName",
  displayName: "displayName",
  description: "description",
  photoUrl: "https://photoUrl.com",
  provider: "twitter",
  providerUid: "providerUid",
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
};

export const mockFirebaseContextValue: FirebaseContextValue = {
  auth: firebase.auth(),
  db: firebase.firestore(),
};

const mockUserContextValue: UserContextValue = {
  user: correctUserData,
  credential: null,
  setCredential: () => {
    return undefined;
  },
};

export const withUserAuth = (
  children: React.ReactElement,
  firebaseContextValue: FirebaseContextValue = mockFirebaseContextValue,
  userContextValue: UserContextValue = mockUserContextValue
) => {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseContext.Provider value={firebaseContextValue}>
        <UserContext.Provider value={userContextValue}>
          {children}
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </MuiThemeProvider>
  );
};

export const Providers: React.ComponentType<{ children?: any }> = ({
  children,
}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseContext.Provider value={mockFirebaseContextValue}>
        <UserContext.Provider value={mockUserContextValue}>
          {children}
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </MuiThemeProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options = {}
): RenderResult<typeof Queries, HTMLElement> => {
  return render(ui, { wrapper: Providers, ...options });
};

export const reTestCase = {
  anyWord: expect.stringMatching(/\w+/),
  anyImage: expect.stringMatching(
    /^(data:image\/gif)|\.(png|webp|jpeg|jpg|svg)$/
  ),
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

const seedSongsToPlaylist = () => {
  const SONG_COUNT = 8;
  const songs = [];
  for (let index = 0; index < SONG_COUNT; index++) {
    songs.push({
      trackId: `trackId ${index + 1}`,
      trackName: `alt ${index + 1}`,
      artistName: "",
      collectionName: "",
      artworkUrl100: null,
      artworkUrl600: `src ${index + 1}`,
      trackViewUrl: "",
      previewUrl: null,
    });
  }
  return songs;
};

export const testPlaylist = {
  id: "id",
  twitterId: "twitterId",
  image: "image_normal",
  songs: seedSongsToPlaylist(),
  songsCount: 8,
  updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
};

export const testSong = {
  trackId: "trackId",
  trackName: "trackName",
  artistName: "artistName",
  collectionName: "collectionName",
  artworkUrl100: "src",
  artworkUrl600: "src",
  trackViewUrl: "https://www.trackView.com",
  previewUrl: "https://www.preview.com",
};
