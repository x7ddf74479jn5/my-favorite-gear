/**
 * @jest-environment node
 */

import { renderHook } from "@testing-library/react-hooks";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import useFavoriteLists from "@/hooks/use-favoriteLists";
import { collectionName } from "@/services/constants";

import { Providers, testFavoriteList } from "../test-utils";
import { mockFirebaseContextValue } from "../test-utils";

jest.setTimeout(10000);

const { db } = mockFirebaseContextValue;
if (!db) {
  throw new Error("Firestore must be initialized.");
}

const testOptions = {
  limit: 2,
  orderbyColumn: "updatedAt",
};

const defaultLimit = 30;

const seed = async () => {
  for (let i = 0; i < defaultLimit; i++) {
    const ref = doc(db, collectionName.favoriteLists, `${i}`);
    await setDoc(ref, testFavoriteList);
  }
};

const resetDatabase = async () => {
  const snapshot = await getDocs(collection(db, collectionName.favoriteLists));
  const batch = writeBatch(db);
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
};

beforeAll(async () => {
  await seed();
});

afterAll(async () => {
  await resetDatabase();
});

describe("useFavoriteLists", () => {
  it("should return favoriteLists with options", async () => {
    const { result, waitForValueToChange } = await renderHook(
      () => {
        return useFavoriteLists(testOptions);
      },
      { wrapper: Providers }
    );

    await waitForValueToChange(() => {
      return result.current.favoriteLists;
    });

    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.favoriteLists).toHaveLength(2);
  });

  it("should return favoriteLists with default options", async () => {
    const { result, waitForValueToChange } = await renderHook(
      () => {
        return useFavoriteLists();
      },
      { wrapper: Providers }
    );

    await waitForValueToChange(() => {
      return result.current.favoriteLists;
    });

    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.favoriteLists).toHaveLength(30);
  });
});
