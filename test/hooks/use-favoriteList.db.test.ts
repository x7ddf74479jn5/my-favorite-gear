/**
 * @jest-environment node
 */

import { act, renderHook } from "@testing-library/react-hooks";
import { deleteDoc, doc } from "firebase/firestore";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import useFavoriteList from "@/hooks/use-favoriteList";
import { collectionName } from "@/services/constants";
import { blankFavoriteList } from "@/services/models/favoriteList";
import type { Gear } from "@/services/models/gear";

import { Providers, testGear } from "../test-utils";
import { mockFirebaseContextValue } from "../test-utils";

const { db } = mockFirebaseContextValue;
if (!db) {
  throw new Error("Firestore must be initialized.");
}

const secondTestGear: Gear = {
  productId: "productId2",
  productName: "productName2",
  makerName: "makerName2",
  brandName: "brandName2",
  productUrlPC: "productUrlPC2",
  mediumImageUrl: "mediumImageUrl2",
  affiliateUrl: "https://www.affiliate.com/2",
  amazonUrl: "https://www.amazon.com/2",
  averagePrice: "averagePrice2",
  genreName: "genreName2",
  reviewAverage: 1,
};

const testOptions = {
  id: "id",
  image: "image",
  twitterId: "twitterId",
};

const resetDatabase = async () => {
  const ref = doc(db, collectionName.favoriteLists, testOptions.id);
  await deleteDoc(ref);
};

beforeEach(() => {
  resetDatabase();
});

afterAll(() => {
  resetDatabase();
});

describe("useFavoriteList", () => {
  it("should return when id is null", () => {
    const { result } = renderHook(() => {
      return useFavoriteList({});
    });

    expect(result.current.favoriteList).toMatchObject(blankFavoriteList);

    result.current.addGear(testGear);
    expect(result.current.favoriteList).toMatchObject(blankFavoriteList);
  });

  it("add", async () => {
    const { result } = await renderHook(
      () => {
        return useFavoriteList(testOptions);
      },
      { wrapper: Providers }
    );

    await act(async () => {
      return await result.current.addGear(testGear);
    });
    expect(result.current.favoriteList.gears[0]).toMatchObject(testGear);
  });

  it("remove", async () => {
    const { result } = await renderHook(
      () => {
        return useFavoriteList(testOptions);
      },
      { wrapper: Providers }
    );

    await act(async () => {
      return await result.current.addGear(testGear);
    });
    expect(result.current.favoriteList.gears).toHaveLength(1);

    await act(async () => {
      await result.current.removeGear(testGear);
    });
    expect(result.current.favoriteList.gears).toHaveLength(0);
  });

  it("up", async () => {
    await act(async () => {
      const { result } = await renderHook(
        () => {
          return useFavoriteList(testOptions);
        },
        { wrapper: Providers }
      );

      await result.current.addGear(testGear);

      await result.current.addGear(secondTestGear);
      expect(result.current.favoriteList.gears[0]).toMatchObject(testGear);
      expect(result.current.favoriteList.gears[1]).toMatchObject(
        secondTestGear
      );

      await result.current.upGear(secondTestGear);
      expect(result.current.favoriteList.gears[0]).toMatchObject(
        secondTestGear
      );
      expect(result.current.favoriteList.gears[1]).toMatchObject(testGear);
    });
  });

  it("down", async () => {
    const { result } = await renderHook(
      () => {
        return useFavoriteList(testOptions);
      },
      { wrapper: Providers }
    );

    await act(async () => {
      return await result.current.addGear(testGear);
    });
    await act(async () => {
      return await result.current.addGear(secondTestGear);
    });
    expect(result.current.favoriteList.gears[0]).toMatchObject(testGear);
    expect(result.current.favoriteList.gears[1]).toMatchObject(secondTestGear);

    await act(async () => {
      return await result.current.downGear(testGear);
    });
    expect(result.current.favoriteList.gears[0]).toMatchObject(secondTestGear);
    expect(result.current.favoriteList.gears[1]).toMatchObject(testGear);
  });
});
