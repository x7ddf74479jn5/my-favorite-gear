import FavoriteListContainer from "containers/FavoriteList/FavoriteList";
import paths from "paths";
import React from "react";
import { MemoryRouter, Route } from "react-router";
import type { Gear } from "services/models/gear";

import { correctUserData, render } from "../../test-utils";

/**
 * should run all the tests, don't change the test case orders
 */

jest.mock("hooks/use-favoriteList", () => {
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
  const testGear: Gear = {
    productId: "productId",
    productName: "productName",
    makerName: "makerName",
    mediumImageUrl: "src",
    affiliateUrl: "https://www.affiliate.com",
  };

  // @return {FavoriteList} each test case
  const useFavoriteList = jest
    .fn()
    .mockReturnValueOnce({
      // #1
      loading: true,
    })
    .mockReturnValueOnce({
      // #2
      favoriteList: {
        id: "id",
        gears: [testGear],
        twitterId: "twitterId",
      },
    })
    .mockReturnValueOnce({
      // #3
      favoriteList: {
        id: null,
        gears: [testGear],
        twitterId: "twitterId",
      },
    })
    .mockReturnValueOnce({
      // #4
      favoriteList: {
        id: "id",
        gears: seedGearsToFavoriteList(),
        twitterId: "twitterId",
      },
    })
    .mockReturnValueOnce({
      // #5
      favoriteList: {
        id: "id_2",
        gears: seedGearsToFavoriteList(),
        twitterId: "twitterId",
      },
    });
  return useFavoriteList;
});

describe("FavoriteList", () => {
  it("renders loading state (#1)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={["favoriteList"]}>
        <FavoriteListContainer user={correctUserData} />
      </MemoryRouter>
    );

    expect(renderResult.getByText("読み込み中")).toBeInTheDocument();
  });

  it("renders correctly when a gear count is less than 8 and a user has already made own favorite list (#2)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={[paths.favoriteListRoot + "id"]}>
        <Route path={paths.favoriteList}>
          <FavoriteListContainer user={correctUserData} />
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

  it("renders correctly when a gear count is less than 8 and a user has not made own favorite list yet (#3)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={[paths.favoriteListRoot + "id"]}>
        <Route path={paths.favoriteList}>
          <FavoriteListContainer user={correctUserData} />
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

  it("renders correctly when a favoriteList is user own list and a gear count is 8 (#4)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={[paths.favoriteListRoot + "id"]}>
        <Route path={paths.favoriteList}>
          <FavoriteListContainer user={correctUserData} />
        </Route>
      </MemoryRouter>
    );

    // 8 gears and 1 twitter icon
    expect(renderResult.getAllByRole("listitem")).toHaveLength(1 + 8);
    // MakeImage: 8 gears and 1 twitter icon
    // GearCards: 8 gears
    expect(renderResult.getAllByRole("img")).toHaveLength(1 + 8 + 8);
    expect(renderResult.container).toHaveTextContent("編集");
  });

  it("renders correctly when a favoriteList is another user's list and a gear count is 8 (#5)", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={[paths.favoriteListRoot + "id"]}>
        <Route path={paths.favoriteList}>
          <FavoriteListContainer user={correctUserData} />
        </Route>
      </MemoryRouter>
    );

    // 8 gears and 1 twitter icon
    expect(renderResult.getAllByRole("listitem")).toHaveLength(1 + 8);
    // MakeImage: 8 gears and 1 twitter icon
    // GearCards: 8 gears
    expect(renderResult.getAllByRole("img")).toHaveLength(1 + 8 + 8);
    expect(renderResult.container).toHaveTextContent(
      "自分もMy Favorite gearを作る"
    );
  });
});
