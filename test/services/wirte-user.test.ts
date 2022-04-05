/* eslint-disable react-hooks/rules-of-hooks */
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useFirestore } from "@/lib/firebase";
import { blankUser } from "@/services/models/user";
import writeUser from "@/services/write-user";

const db = useFirestore();

beforeEach(async () => {
  vi.resetAllMocks();
  vi.clearAllMocks();
});

// FIXME: this test is not working
describe.skip("writeUser", () => {
  it("creates user", async () => {
    // 1st: resolve screenname duplication, 2nd: search current user

    const mockUser = {
      uid: "uid",
      displayName: "displayName 1",
      photoURL: "photoURL 1",
    } as any;

    const mockUserCredential = {
      additionalUserInfo: {
        username: "username 1",
        profile: {
          id_str: "id_str 1",
          description: "description 1",
        },
      },
    } as any;

    const user = await writeUser(db, mockUser, mockUserCredential);

    expect(user).toEqual({
      ...blankUser,
      providerUid: "id_str 1",
      screenName: "username 1",
      displayName: "displayName 1",
      description: "description 1",
      photoUrl: "photoURL 1",
    });
  });

  it("updates user", async () => {
    // 1st: resolve screenname duplication, 2nd: search current user

    const mockUser = {
      uid: "uid",
      displayName: "displayName 2",
      photoURL: "photoURL 2",
    } as any;

    const mockUserCredential = {
      additionalUserInfo: {
        username: "username",
        profile: {
          id_str: "id_str",
          description: "description 2",
        },
      },
    } as any;

    const user = await writeUser(db, mockUser, mockUserCredential);
    expect(user).toMatchObject({
      id: "uid",
      screenName: "username",
      displayName: "displayName 2",
      description: "description 2",
      photoUrl: "photoURL 2",
      provider: "twitter",
      providerUid: "id_str",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    });
  });

  it("doesn't update user", async () => {
    // 1st: resolve screenname duplication, 2nd: search current user

    const mockUser = {
      uid: "uid",
      displayName: "displayName",
      photoURL: "photoURL",
    } as any;

    const mockUserCredential = {
      additionalUserInfo: {
        username: "username",
        profile: {
          id_str: "id_str",
          description: "description",
        },
      },
    } as any;

    const user = await writeUser(db, mockUser, mockUserCredential);
    expect(user).toMatchObject({
      id: "uid",
      screenName: "username",
      displayName: "displayName",
      description: "description",
      photoUrl: "photoURL",
      provider: "twitter",
      providerUid: "id_str",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    });
  });

  it("provides other screen name having random suffix when the screen name has already been used", async () => {
    // 1st: resolve screenname duplication, 2nd: search current user

    const mockUser = {
      uid: "uid",
      displayName: "displayName",
      photoURL: "photoURL",
    } as any;

    const mockUserCredential = {
      additionalUserInfo: {
        username: "username",
        profile: {
          id_str: "id_str",
          description: "description",
        },
      },
    } as any;

    const user = await writeUser(db, mockUser, mockUserCredential);

    expect(user).toMatchObject({
      screenName: expect.stringMatching(/username(\d){4}/),
      displayName: "displayName",
      description: "description",
      photoUrl: "photoURL",
      provider: "twitter",
      providerUid: "id_str",
    });
  });

  it("throws an error when there is not a provider uid", async () => {
    // 1st: resolve screenname duplication, 2nd: search current user

    const mockUser = {
      uid: "uid",
      displayName: "displayName",
      photoURL: "photoURL",
    } as any;

    const mockUserCredential = {
      additionalUserInfo: {
        username: "username",
        profile: {
          id_str: undefined,
          description: "description",
        },
      },
    } as any;

    await expect(writeUser(db, mockUser, mockUserCredential)).rejects.toThrow();
  });

  it("throws an error when there is not a screen name", async () => {
    // 1st: resolve screenname duplication, 2nd: search current user

    const mockUser = {
      uid: "uid",
      displayName: "displayName",
      photoURL: "photoURL",
    } as any;

    const mockUserCredential = {
      additionalUserInfo: {
        username: "",
        profile: {
          id_str: "id_str",
          description: "description",
        },
      },
    } as any;

    await expect(writeUser(db, mockUser, mockUserCredential)).rejects.toThrow();
  });

  it("writes data to the counter doc", async () => {
    // 1st: resolve screenname duplication, 2nd: search current user

    const mockUser = {
      uid: "uid",
      displayName: "displayName",
      photoURL: "photoURL",
    } as any;

    const mockUserCredential = {
      additionalUserInfo: {
        username: "username",
        profile: {
          id_str: "id_str",
          description: "description",
        },
      },
    } as any;

    const user = await writeUser(db, mockUser, mockUserCredential);
    expect(user).toBeTruthy();
  });
});
