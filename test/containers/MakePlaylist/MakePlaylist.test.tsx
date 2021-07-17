import MakePlaylistContainer from "containers/MakePlaylist/MakePlaylist";
import React from "react";

import { correctUserData, render } from "../../test-utils";

jest.mock("hooks/use-playlist", () => {
  const usePlaylist = jest
    .fn()
    .mockReturnValueOnce({
      playlist: {
        songs: [],
      },
    })
    .mockReturnValueOnce({
      playlist: {
        songs: ["song"],
      },
    })
    .mockReturnValueOnce({
      playlist: {
        songs: ["song", "song", "song", "song", "song", "song", "song", "song"],
      },
    })
    .mockReturnValueOnce({
      playlist: {
        songs: [],
      },
    });
  return usePlaylist;
});

jest.mock("hooks/use-iTunes", () => {
  // {return} 1st: case #1, 2nd: case #2, ...rest
  const useITunes = jest
    .fn()
    .mockReturnValueOnce({
      loading: false,
      iTunesSongs: [],
      searchSongs: jest.fn(),
    })
    .mockReturnValueOnce({
      loading: false,
      iTunesSongs: [],
      searchSongs: jest.fn(),
    })
    .mockReturnValueOnce({
      loading: false,
      iTunesSongs: [],
      searchSongs: jest.fn(),
    })
    .mockReturnValueOnce({
      loading: true,
      iTunesSongs: [],
      searchSongs: jest.fn(),
    });
  return useITunes;
});

// TODO: integration test

describe("MakePlaylist", () => {
  it("renders correctly when a user haven't registered any item (#1)", () => {
    const renderResult = render(
      <MakePlaylistContainer user={correctUserData} />
    );

    expect(renderResult.getByRole("heading", { level: 6 })).toHaveTextContent(
      "商品検索"
    );
    expect(renderResult.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders correctly when a user have registered one item (#2)", () => {
    const renderResult = render(
      <MakePlaylistContainer user={correctUserData} />
    );

    expect(
      renderResult.getAllByRole("heading", { level: 6 })[0]
    ).toHaveTextContent("商品検索");
    expect(renderResult.getByRole("textbox")).toBeInTheDocument();
    expect(
      renderResult.getAllByRole("heading", { level: 6 })[1]
    ).toHaveTextContent(/[0-8]商品/);
    expect(renderResult.container).toHaveTextContent(
      "My Favorite Gearを「8商品」登録してください。"
    );
  });

  it("renders correctly when a user have registered eight items (#3)", () => {
    const renderResult = render(
      <MakePlaylistContainer user={correctUserData} />
    );

    expect(
      renderResult.getAllByRole("heading", { level: 6 })[0]
    ).toHaveTextContent("商品検索");
    expect(renderResult.getByRole("textbox")).toBeInTheDocument();
    expect(renderResult.getAllByRole("listitem")).toHaveLength(9);

    renderResult.debug();
  });

  it("renders loading state (#4)", () => {
    const renderResult = render(
      <MakePlaylistContainer user={correctUserData} />
    );

    expect(renderResult.getByText("読み込み中")).toBeInTheDocument();
  });
});
