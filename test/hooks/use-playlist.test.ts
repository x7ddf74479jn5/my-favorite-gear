/**
 * @jest-environment node
 */

import { act, renderHook } from "@testing-library/react-hooks";
import usePlaylist from "hooks/use-playlist";
import { blankPlaylist } from "services/models/playlist";

import { collectionName } from "../../refs/js/services/constants";
import { Providers, testSong } from "../test-utils";
import { mockFirebaseContextValue } from "../test-utils";

const { db } = mockFirebaseContextValue;
if (!db) {
  throw new Error("Firestore must be initialized.");
}

export const secondTestSong = {
  trackId: "trackId 2",
  trackName: "trackName 2",
  artistName: "artistName 2",
  collectionName: "collectionName 2",
  artworkUrl100: "src 2",
  artworkUrl600: "src 2",
  trackViewUrl: "https://www.trackView2.com",
  previewUrl: "https://www.preview2.com",
};

const testOptions = {
  id: "id",
  image: "image",
  twitterId: "twitterId",
};

const resetDatabase = async () => {
  const ref = db.collection(collectionName.playlists).doc(testOptions.id);
  await ref.delete();
};

beforeEach(() => {
  resetDatabase();
});

afterAll(() => {
  resetDatabase();
});

describe("usePlaylist", () => {
  it("should return when id is null", () => {
    const { result } = renderHook(() => {
      return usePlaylist({});
    });

    expect(result.current.playlist).toMatchObject(blankPlaylist);

    result.current.addSong(testSong);
    expect(result.current.playlist).toMatchObject(blankPlaylist);
  });

  it("add", async () => {
    const { result } = await renderHook(
      () => {
        return usePlaylist(testOptions);
      },
      { wrapper: Providers }
    );

    await act(async () => {
      return await result.current.addSong(testSong);
    });
    expect(result.current.playlist.songs[0]).toMatchObject(testSong);
  });

  it("remove", async () => {
    const { result } = await renderHook(
      () => {
        return usePlaylist(testOptions);
      },
      { wrapper: Providers }
    );

    await act(async () => {
      return await result.current.addSong(testSong);
    });
    expect(result.current.playlist.songs).toHaveLength(1);

    await act(async () => {
      await result.current.removeSong(testSong);
    });
    expect(result.current.playlist.songs).toHaveLength(0);
  });

  it("up", async () => {
    await act(async () => {
      const { result } = await renderHook(
        () => {
          return usePlaylist(testOptions);
        },
        { wrapper: Providers }
      );

      await result.current.addSong(testSong);

      await result.current.addSong(secondTestSong);
      expect(result.current.playlist.songs[0]).toMatchObject(testSong);
      expect(result.current.playlist.songs[1]).toMatchObject(secondTestSong);

      await result.current.upSong(secondTestSong);
      expect(result.current.playlist.songs[0]).toMatchObject(secondTestSong);
      expect(result.current.playlist.songs[1]).toMatchObject(testSong);
    });
  });

  it("down", async () => {
    const { result } = await renderHook(
      () => {
        return usePlaylist(testOptions);
      },
      { wrapper: Providers }
    );

    await act(async () => {
      return await result.current.addSong(testSong);
    });
    await act(async () => {
      return await result.current.addSong(secondTestSong);
    });
    expect(result.current.playlist.songs[0]).toMatchObject(testSong);
    expect(result.current.playlist.songs[1]).toMatchObject(secondTestSong);

    await act(async () => {
      return await result.current.downSong(testSong);
    });
    expect(result.current.playlist.songs[0]).toMatchObject(secondTestSong);
    expect(result.current.playlist.songs[1]).toMatchObject(testSong);
  });
});
