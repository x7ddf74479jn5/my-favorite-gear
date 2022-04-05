import React from "react";
import { describe, expect, it } from "vitest";

import MakeImage from "@/components/common/makeImage/MakeImage";

import { render, testFavoriteList, testGear } from "../../../test-utils";

describe("MakeImage", () => {
  it("matches snapshot", () => {
    let renderResult = render(
      <MakeImage favoriteList={testFavoriteList} gear={undefined} />
    );
    expect(renderResult.asFragment()).toMatchSnapshot();

    renderResult = render(
      <MakeImage favoriteList={undefined} gear={testGear} />
    );
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders 3x3 tiles when provided only favoriteList", () => {
    const renderResult = render(
      <MakeImage favoriteList={testFavoriteList} gear={undefined} />
    );

    const imageElements = renderResult.getAllByRole("img");
    expect(imageElements).toHaveLength(9);
    const twitterTileImg = imageElements[4];
    expect(twitterTileImg).toHaveAttribute("src", "image");
    expect(twitterTileImg).toHaveAttribute("alt", "twitterId");
  });

  it("renders 1 tile when provided only gear", () => {
    const renderResult = render(
      <MakeImage favoriteList={undefined} gear={testGear} />
    );

    expect(renderResult.getAllByRole("img")).toHaveLength(1);
    const imageElement = renderResult.getByRole("img");
    expect(imageElement).toHaveAttribute("src", "mediumImageUrl");
    expect(imageElement).toHaveAttribute("alt", testGear.productName);
  });

  it("renders none when provided neither favoriteList nor gear", () => {
    const renderResult = render(
      <MakeImage favoriteList={undefined} gear={undefined} />
    );

    expect(renderResult.getAllByRole("img")).toHaveLength(1);
  });
});
