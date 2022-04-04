import React from "react";
import { MemoryRouter, Route } from "react-router";
import { describe, expect, it, vi } from "vitest";

import FavoriteListContainer from "@/containers/FavoriteList/FavoriteList";
import paths from "@/paths";
import type { Gear } from "@/services/models/gear";

import { correctUserData, render } from "../../test-utils";

/**
 * should run all the tests, don't change the test case orders
 */

vi.mock("hooks/use-favoriteList", () => {
  const seedGearsToFavoriteList = () => {
    const GEAR_COUNT = 8;
    const gears: Gear[] = [];
    for (let i = 0; i < GEAR_COUNT; i++) {
      gears.push({
        productId: `productId ${i + 1}`,
        productName: `productName ${i + 1}`,
        makerName: `makerName ${i + 1}`,
        brandName: `brandName ${i + 1}`,
        productUrlPC: `productUrlPC ${i + 1}`,
        mediumImageUrl: `mediumImageUrl ${i + 1}`,
        affiliateUrl: `https://www.affiliate.com/${i + 1}`,
        amazonUrl: `https://www.amazon.com/${i + 1}`,
        averagePrice: `averagePrice ${i + 1}`,
        genreName: `genreName ${i + 1}`,
        reviewAverage: 1,
      });
    }
    return gears;
  };
  const testGear: Gear = {
    productId: "productId",
    productName: "productName",
    makerName: "makerName",
    brandName: "brandName",
    productUrlPC: "productUrlPC",
    mediumImageUrl: "mediumImageUrl",
    affiliateUrl: "https://www.affiliate.com",
    amazonUrl: `https://www.amazon.com/`,
    averagePrice: "averagePrice",
    genreName: "genreName",
    reviewAverage: 1,
  };

  // @return {FavoriteList} each test case
  const useFavoriteList = vi
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
    renderResult.debug();
    expect(renderResult.getByRole("heading", { level: 6 })).toHaveTextContent(
      "twitterId"
    );
    const buttonElement = renderResult.getByRole("button");
    expect(renderResult.container).toHaveTextContent(
      "8アイテム選ばれていません。"
    );
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
    expect(renderResult.container).toHaveTextContent(
      "8アイテム選ばれていません。"
    );
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
