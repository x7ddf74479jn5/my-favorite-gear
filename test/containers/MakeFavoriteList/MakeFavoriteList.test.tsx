import MakeFavoriteListContainer from "containers/MakeFavoriteList/MakeFavoriteList";
import React from "react";
import type { Gear } from "services/models/gear";

import { correctUserData, render } from "../../test-utils";

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
  const useFavoriteList = jest
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

jest.mock("hooks/use-rakutenSearch", () => {
  // {return} 1st: case #1, 2nd: case #2, ...rest
  const useITunes = jest
    .fn()
    .mockReturnValueOnce({
      loading: false,
      gears: [],
      searchGears: jest.fn(),
    })
    .mockReturnValueOnce({
      loading: false,
      gears: [],
      searchGears: jest.fn(),
    })
    .mockReturnValueOnce({
      loading: false,
      gears: [],
      searchGears: jest.fn(),
    })
    .mockReturnValueOnce({
      loading: true,
      gears: [],
      searchGears: jest.fn(),
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
