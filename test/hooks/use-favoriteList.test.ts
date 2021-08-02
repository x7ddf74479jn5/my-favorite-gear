/**
 * @jest-environment node
 */

import { act, renderHook } from "@testing-library/react-hooks";
import useFavoriteList from "hooks/use-favoriteList";
import { collectionName } from "services/constants";
import { blankFavoriteList } from "services/models/favoriteList";
import type { Gear } from "services/models/gear";

import { Providers, testGear } from "../test-utils";
import { mockFirebaseContextValue } from "../test-utils";

const { db } = mockFirebaseContextValue;
if (!db) {
  throw new Error("Firestore must be initialized.");
}

const secondTestGear: Gear = {
  productId: "trackId",
  productName: "trackName",
  makerName: "artistName",
  mediumImageUrl: "src",
  affiliateUrl: "https://www.affiliate.com",
};

const testOptions = {
  id: "id",
  image: "image",
  twitterId: "twitterId",
};

const resetDatabase = async () => {
  const ref = db.collection(collectionName.favoriteLists).doc(testOptions.id);
  await ref.delete();
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
