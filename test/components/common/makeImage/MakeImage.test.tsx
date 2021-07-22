import MakeImage from "components/common/makeImage/MakeImage";
import React from "react";

import { render, testPlaylist, testSong } from "../../../test-utils";

describe("MakeImage", () => {
  it("matches snapshot", () => {
    let renderResult = render(
      <MakeImage playlist={testPlaylist} song={undefined} />
    );
    expect(renderResult.asFragment()).toMatchSnapshot();

    renderResult = render(<MakeImage playlist={undefined} song={testSong} />);
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders 3x3 tiles when provided only playlist", () => {
    const renderResult = render(
      <MakeImage playlist={testPlaylist} song={undefined} />
    );

    const listElement = renderResult.getByRole("list");
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveAttribute(
      "class",
      expect.stringContaining("gridlist")
    );
    expect(renderResult.getAllByRole("listitem")).toHaveLength(9);
    expect(renderResult.getAllByRole("listitem")[0]).toHaveStyle({
      height: "120px",
    });
    const twitterTileImg = renderResult.getAllByRole("img")[4];
    expect(twitterTileImg).toHaveAttribute("src", "image");
    expect(twitterTileImg).toHaveAttribute("alt", "twitterId");
  });

  it("renders 1 tile when provided only song", () => {
    const renderResult = render(
      <MakeImage playlist={undefined} song={testSong} />
    );

    const listElement = renderResult.getByRole("list");
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveAttribute(
      "class",
      expect.stringContaining("gridlist")
    );
    expect(renderResult.getAllByRole("listitem")).toHaveLength(1);
    expect(renderResult.getAllByRole("img")).toHaveLength(1);
    const imageElement = renderResult.getByRole("img");
    expect(imageElement).toHaveAttribute("src", "src");
    expect(imageElement).toHaveAttribute("alt", testSong.trackName);
  });

  it("renders none when provided neither playlist nor song", () => {
    const renderResult = render(
      <MakeImage playlist={undefined} song={undefined} />
    );

    const rootElement = renderResult.container.firstChild;
    expect(rootElement).toHaveAttribute(
      "class",
      expect.stringContaining("root")
    );
    const listElement = renderResult.getByRole("list");
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveAttribute(
      "class",
      expect.stringContaining("gridlist")
    );
    expect(renderResult.getAllByRole("listitem")).toHaveLength(1);
  });
});
