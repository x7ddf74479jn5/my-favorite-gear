import React from "react";
import { describe, expect, it, vi } from "vitest";

import MakeFavoriteListContainer from "@/containers/MakeFavoriteList/MakeFavoriteList";
import type { Gear } from "@/services/models/gear";

import { correctUserData, render } from "../../test-utils";

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
  const useFavoriteList = vi
    .fn()
    .mockReturnValueOnce({
      favoriteList: {
        gears: [],
      },
    })
    .mockReturnValueOnce({
      favoriteList: {
        gears: [
          {
            productId: `trackId`,
            productName: `trackName`,
            makerName: `artistName`,
            mediumImageUrl: `src`,
            affiliateUrl: `https://www.affiliate.com/`,
          },
        ],
      },
    })
    .mockReturnValueOnce({
      favoriteList: {
        gears: seedGearsToFavoriteList(),
      },
    })
    .mockReturnValueOnce({
      favoriteList: {
        gears: [],
      },
    });
  return useFavoriteList;
});

vi.mock("hooks/use-rakutenSearch", () => {
  // {return} 1st: case #1, 2nd: case #2, ...rest
  const useITunes = vi
    .fn()
    .mockReturnValueOnce({
      loading: false,
      gears: [],
      searchGears: vi.fn(),
    })
    .mockReturnValueOnce({
      loading: false,
      gears: [],
      searchGears: vi.fn(),
    })
    .mockReturnValueOnce({
      loading: false,
      gears: [],
      searchGears: vi.fn(),
    })
    .mockReturnValueOnce({
      loading: true,
      gears: [],
      searchGears: vi.fn(),
    });
  return useITunes;
});

describe("MakeFavoriteList", () => {
  it("renders correctly when a user haven't registered any item (#1)", () => {
    const renderResult = render(
      <MakeFavoriteListContainer user={correctUserData} />
    );

    expect(renderResult.getByRole("heading", { level: 6 })).toHaveTextContent(
      "商品検索"
    );
    expect(renderResult.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders correctly when a user have registered one item (#2)", () => {
    const renderResult = render(
      <MakeFavoriteListContainer user={correctUserData} />
    );

    expect(
      renderResult.getAllByRole("heading", { level: 6 })[0]
    ).toHaveTextContent("商品検索");
    expect(renderResult.getByRole("textbox")).toBeInTheDocument();
    expect(
      renderResult.getAllByRole("heading", { level: 6 })[1]
    ).toHaveTextContent(/[0-8]アイテム/);
    expect(renderResult.container).toHaveTextContent(
      "My Favorite Gearを「8アイテム」登録してください。"
    );
  });

  it("renders correctly when a user have registered eight items (#3)", () => {
    const renderResult = render(
      <MakeFavoriteListContainer user={correctUserData} />
    );

    expect(
      renderResult.getAllByRole("heading", { level: 6 })[0]
    ).toHaveTextContent("商品検索");
    expect(renderResult.getByRole("textbox")).toBeInTheDocument();
    expect(renderResult.getAllByRole("listitem")).toHaveLength(9);
  });

  it("renders loading state (#4)", () => {
    const renderResult = render(
      <MakeFavoriteListContainer user={correctUserData} />
    );

    expect(renderResult.getByText("読み込み中")).toBeInTheDocument();
  });
});
