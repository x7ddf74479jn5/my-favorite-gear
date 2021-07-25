/**
 * @jest-environment node
 */

import { renderHook } from "@testing-library/react-hooks";
import usePlaylists from "hooks/use-playlists";

import { collectionName } from "../../refs/js/services/constants";
import { Providers, testPlaylist } from "../test-utils";
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
    const ref = db.collection(collectionName.playlists).doc(`${i}`);
    await ref.set(testPlaylist);
  }
};

const resetDatabase = async () => {
  const snapshot = await db.collection(collectionName.playlists).get();
  const batch = db.batch();
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

describe("usePlaylists", () => {
  it("should return playlists with options", async () => {
    const { result, waitForValueToChange } = await renderHook(
      () => {
        return usePlaylists(testOptions);
      },
      { wrapper: Providers }
    );

    await waitForValueToChange(() => {
      return result.current.playlists;
    });

    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.playlists).toHaveLength(2);
  });

  it("should return playlists with default options", async () => {
    const { result, waitForValueToChange } = await renderHook(
      () => {
        return usePlaylists();
      },
      { wrapper: Providers }
    );

    await waitForValueToChange(() => {
      return result.current.playlists;
    });

    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.playlists).toHaveLength(30);
  });
});
