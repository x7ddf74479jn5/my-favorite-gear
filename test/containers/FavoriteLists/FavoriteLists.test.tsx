import FavoriteListContainer from "containers/FavoriteLists/FavoriteLists";
import paths from "paths";
import React from "react";
import { MemoryRouter } from "react-router";
import type { Gear } from "services/models/gear";

import { render } from "../../test-utils";

/**
 * should run all the tests, don't change the test case orders
 */

jest.mock("hooks/use-favoriteLists", () => {
  const seedGearsToFavoriteList = () => {
    const GEAR_COUNT = 8;
    const gears: Gear[] = [];
    for (let index = 0; index < GEAR_COUNT; index++) {
      gears.push({
        productId: `productId${index + 1}`,
        productName: `productName${index + 1}`,
        makerName: `makerName${index + 1}`,
        mediumImageUrl: `src${index + 1}`,
        affiliateUrl: `https://www.affiliate.com/${index + 1}`,
      });
    }
    return gears;
  };
  const testFavoriteList = {
    id: "id",
    twitterId: "twitterId",
    image: "image_normal",
    gears: seedGearsToFavoriteList(),
    gearsCount: 8,
    updatedAt: "updatedAt",
  };
  // @return {FavoriteLists} each test case
  const useFavoriteLists = jest
    .fn()
    .mockReturnValueOnce({
      // #1
      loading: true,
    })
    .mockReturnValueOnce({
      // #2
      favoriteLists: [],
    })
    .mockReturnValueOnce({
      // #3
      favoriteLists: [testFavoriteList],
    });
  return useFavoriteLists;
});

describe("FavoriteLists", () => {
  it("renders loading state (#1)", () => {
    const renderResult = render(<FavoriteListContainer />);

    expect(renderResult.getByText("読み込み中")).toBeInTheDocument();
  });

  it("renders correctly when no favoriteLists (#2)", () => {
    const renderResult = render(<FavoriteListContainer />);

    expect(renderResult.getByRole("heading", { level: 5 })).toHaveTextContent(
      "みんなのMy Favorite gear"
    );
    expect(renderResult.container).toHaveTextContent(
      "My Favorite gearがありません。"
    );
  });

  it("renders correctly when favoriteLists (#3)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={[paths.favoriteLists]}>
        <FavoriteListContainer />
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
    expect(linkButton).toHaveAttribute("href", `${paths.favoriteListRoot}id`);
  });
});
