import PlaylistContainer from "containers/Playlist/Playlist";
import paths from "paths";
import React from "react";
import { MemoryRouter, Route } from "react-router";

import { correctUserData, render } from "../../test-utils";

/**
 * should run all the tests, don't change the test case orders
 */

jest.mock("hooks/use-playlist", () => {
  const seedSongsToPlaylist = () => {
    const SONG_COUNT = 8;
    const songs = [];
    for (let index = 0; index < SONG_COUNT; index++) {
      songs.push({
        trackId: `trackId ${index + 1}`,
        trackName: `alt ${index + 1}`,
        artistName: "artistName",
        collectionName: "collectionName",
        artworkUrl100: `src ${index + 1}`,
        artworkUrl600: `src ${index + 1}`,
        trackViewUrl: "https://www.trackView.com",
        previewUrl: "https://www.preview.com",
      });
    }
    return songs;
  };

  // @return {Playlist} each test case
  const usePlaylist = jest
    .fn()
    .mockReturnValueOnce({
      // #1
      loading: true,
    })
    .mockReturnValueOnce({
      // #2
      playlist: {
        id: "id",
        songs: ["song"],
        twitterId: "twitterId",
      },
    })
    .mockReturnValueOnce({
      // #3
      playlist: {
        id: null,
        songs: ["song"],
        twitterId: "twitterId",
      },
    })
    .mockReturnValueOnce({
      // #4
      playlist: {
        id: "id",
        songs: seedSongsToPlaylist(),
        twitterId: "twitterId",
      },
    })
    .mockReturnValueOnce({
      // #5
      playlist: {
        id: "id_2",
        songs: seedSongsToPlaylist(),
        twitterId: "twitterId",
      },
    });
  return usePlaylist;
});

describe("Playlist", () => {
  it("renders loading state (#1)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={["playlist"]}>
        <PlaylistContainer user={correctUserData} />
      </MemoryRouter>
    );

    expect(renderResult.getByText("読み込み中")).toBeInTheDocument();
  });

  it("renders correctly when a song count is less than 8 and a user has already made own favorite list (#2)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={[paths.playlistRoot + "id"]}>
        <Route path={paths.playlist}>
          <PlaylistContainer user={correctUserData} />
        </Route>
      </MemoryRouter>
    );

    expect(renderResult.getByRole("heading", { level: 6 })).toHaveTextContent(
      "twitterId"
    );
    const buttonElement = renderResult.getByRole("button");
    expect(renderResult.container).toHaveTextContent("8品選ばれていません。");
    expect(buttonElement).toHaveTextContent("編集");
    expect(buttonElement).toBeEnabled();
  });

  it("renders correctly when a song count is less than 8 and a user has not made own favorite list yet (#3)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={[paths.playlistRoot + "id"]}>
        <Route path={paths.playlist}>
          <PlaylistContainer user={correctUserData} />
        </Route>
      </MemoryRouter>
    );

    expect(renderResult.getByRole("heading", { level: 6 })).toHaveTextContent(
      "twitterId"
    );
    const buttonElement = renderResult.getByRole("button");
    expect(renderResult.container).toHaveTextContent("8品選ばれていません。");
    expect(buttonElement).toHaveTextContent("お気に入りリストを作る");
    expect(buttonElement).toBeEnabled();
  });

  it("renders correctly when a playlist is user own list and a song count is 8 (#4)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={[paths.playlistRoot + "id"]}>
        <Route path={paths.playlist}>
          <PlaylistContainer user={correctUserData} />
        </Route>
      </MemoryRouter>
    );

    // 8 songs and 1 twitter icon
    expect(renderResult.getAllByRole("listitem")).toHaveLength(1 + 8);
    // MakeImage: 8 songs and 1 twitter icon
    // SongCards: 8 songs
    expect(renderResult.getAllByRole("img")).toHaveLength(1 + 8 + 8);
    expect(renderResult.container).toHaveTextContent("編集");
  });

  it("renders correctly when a playlist is another user's list and a song count is 8 (#5)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={[paths.playlistRoot + "id"]}>
        <Route path={paths.playlist}>
          <PlaylistContainer user={correctUserData} />
        </Route>
      </MemoryRouter>
    );

    // 8 songs and 1 twitter icon
    expect(renderResult.getAllByRole("listitem")).toHaveLength(1 + 8);
    // MakeImage: 8 songs and 1 twitter icon
    // SongCards: 8 songs
    expect(renderResult.getAllByRole("img")).toHaveLength(1 + 8 + 8);
    expect(renderResult.container).toHaveTextContent(
      "自分もMy Favorite gearを作る"
    );
  });
});
