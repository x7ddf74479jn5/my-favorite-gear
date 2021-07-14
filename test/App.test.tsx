import { render } from "@testing-library/react";
import App from "App";
import type { FirebaseContextValue, UserContextValue } from "contexts";
import React from "react";
import { MemoryRouter } from "react-router";
import { blankUser } from "services/models/user";

import { withUserAuth } from "./test-utils";

jest.mock("components/Signin", () => {
  const Singnin = () => {
    return <div>Signin</div>;
  };
  return Singnin;
});

jest.mock("components/Playlist", () => {
  const Playlist = () => {
    return <div>Playlist</div>;
  };
  return Playlist;
});

jest.mock("components/Playlists", () => {
  const Playlists = () => {
    return <div>Playlists</div>;
  };
  return Playlists;
});

jest.mock("firebase");

jest.mock("components/MakePlaylist", () => {
  const MakePlaylist = () => {
    return <div>MakePlaylists</div>;
  };
  return MakePlaylist;
});

const mockFirebaseContextValue: FirebaseContextValue = {
  auth: null,
  db: null,
};

const mockUserContextValue: UserContextValue = {
  user: null,
  credential: {
    credential: null,
    user: null,
  },
  setCredential: jest.fn(),
};

describe("App", () => {
  it("renders root with an auth user", () => {
    const mockUserContextValue: UserContextValue = {
      user: blankUser,
      credential: {
        credential: null,
        user: null,
      },
      setCredential: jest.fn(),
    };
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
        mockFirebaseContextValue,
        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("MakePlaylists");
  });

  it("renders root without an auth user", () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
        mockFirebaseContextValue,
        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("Signin");
  });

  it("renders playlists", () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/playlists"]}>
          <App />
        </MemoryRouter>,
        mockFirebaseContextValue,
        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("Playlists");
  });

  it("renders playlist", () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/playlist/1"]}>
          <App />
        </MemoryRouter>,
        mockFirebaseContextValue,
        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("Playlist");
  });

  it("redirects to root when router path doesn't match any defined path", () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={[""]}>
          <App />
        </MemoryRouter>,
        mockFirebaseContextValue,
        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("Signin");
  });
});
