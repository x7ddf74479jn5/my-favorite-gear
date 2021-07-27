import PlaylistContainer from "containers/Playlists/Playlists";
import paths from "paths";
import React from "react";
import { MemoryRouter } from "react-router";

import { render } from "../../test-utils";

/**
 * should run all the tests, don't change the test case orders
 */

jest.mock("hooks/use-playlists", () => {
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
  const testPlaylist = {
    id: "id",
    twitterId: "twitterId",
    image: "image_normal",
    songs: seedSongsToPlaylist(),
    songsCount: 8,
    updatedAt: "updatedAt",
  };
  // @return {Playlists} each test case
  const usePlaylists = jest
    .fn()
    .mockReturnValueOnce({
      // #1
      loading: true,
    })
    .mockReturnValueOnce({
      // #2
      playlists: [],
    })
    .mockReturnValueOnce({
      // #3
      playlists: [testPlaylist],
    });
  return usePlaylists;
});

describe("Playlists", () => {
  it("renders loading state (#1)", () => {
    const renderResult = render(<PlaylistContainer />);

    expect(renderResult.getByText("読み込み中")).toBeInTheDocument();
  });

  it("renders correctly when no playlists (#2)", () => {
    const renderResult = render(<PlaylistContainer />);

    expect(renderResult.getByRole("heading", { level: 5 })).toHaveTextContent(
      "みんなのMy Favorite gear"
    );
    expect(renderResult.container).toHaveTextContent(
      "My Favorite gearがありません。"
    );
  });

  it("renders correctly when playlists (#3)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={[paths.playlists]}>
        <PlaylistContainer />
      </MemoryRouter>
    );

    expect(renderResult.getByRole("heading", { level: 5 })).toHaveTextContent(
      "みんなのMy Favorite gear"
    );
    expect(renderResult.getByRole("heading", { level: 6 })).toHaveTextContent(
      "twitterIdのMy Favorite gear"
    );
    // MakeImage: 8 songs and 1 twitter icon
    // SongCards: 1 song
    expect(renderResult.getAllByRole("img")).toHaveLength(9 + 1);
    expect(renderResult.getAllByRole("button")).toHaveLength(2);
    const linkButton = renderResult.getAllByRole("button")[1];
    expect(linkButton).toHaveTextContent("くわしくみる");
    expect(linkButton).toHaveAttribute("href", `${paths.playlistRoot}id`);
  });
});
