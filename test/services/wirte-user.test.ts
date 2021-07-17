/**
 * @jest-environment node
 */

jest.setTimeout(10000);

import { collectionName } from "services/constants";
import { blankUser } from "services/models/user";
import writeUser from "services/write-user";

import { mockFirebaseContextValue } from "../test-utils";

const { db } = mockFirebaseContextValue;
if (!db) {
  throw new Error("Firestore must be initialized.");
}

const mockBatchSet = jest.fn();
const mockBatchUpdate = jest.fn();
const mockBatchCommit = jest.fn();
const mockGet = jest.fn();
const mockCollection = jest.fn();
const mockWhere = jest.fn();

let mockFirestore = {
  collection: () => {
    return;
  },
  batch: () => {
    return {
      set: mockBatchSet,
      update: mockBatchUpdate,
      commit: mockBatchCommit,
    };
  },
} as any;

beforeEach(async () => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  //1st: resolve screenname duplication, 2nd: search current user, 3rd: counterDoc
  mockCollection
    .mockReturnValueOnce({
      where: mockWhere.mockReturnValueOnce({ get: mockGet }),
    })
    .mockReturnValueOnce({
      doc: jest.fn().mockReturnValueOnce({ get: mockGet }),
    })
    .mockReturnValueOnce({
      doc: jest.fn(() => {
        return "counterDoc";
      }),
    });

  mockFirestore = { ...mockFirestore, collection: mockCollection };
});

describe("writeUser", () => {
  it("creates user", async () => {
    // 1st: resolve screenname duplication, 2nd: search current user
    mockGet.mockReturnValueOnce({ size: 0 }).mockReturnValueOnce({
      exists: false,
      data: () => {
        return {};
      },
    });

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

    // const user = await writeUser(db, mockUser, mockUserCredential);
    const user = await writeUser(mockFirestore, mockUser, mockUserCredential);

    expect(mockGet).toBeCalledTimes(2);
    expect(mockCollection).toHaveBeenNthCalledWith(1, collectionName.users);
    expect(mockCollection).toHaveBeenNthCalledWith(2, collectionName.users);
    expect(mockCollection).toHaveBeenNthCalledWith(
      3,
      collectionName.docCounters
    );

    expect(mockBatchCommit).toBeCalled();
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
    mockGet.mockReturnValueOnce({ size: 0 }).mockReturnValueOnce({
      id: "uid",
      exists: true,
      data: () => {
        return {
          id: "uid",
          screenName: "username",
          displayName: "displayName 1",
          description: "",
          photoUrl: "photoURL 1",
          provider: "twitter",
          providerUid: "id_str",
          createdAt: "createdAt",
          updatedAt: "updatedAt",
        };
      },
    });

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

    const user = await writeUser(mockFirestore, mockUser, mockUserCredential);
    // const user = await writeUser(db, mockUser, mockUserCredential);

    expect(mockBatchUpdate).toBeCalled();
    expect(mockBatchSet).not.toBeCalled();
    expect(mockBatchCommit).toBeCalled();
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
    mockGet.mockReturnValueOnce({ size: 0 }).mockReturnValueOnce({
      id: "uid",
      exists: true,
      data: () => {
        return {
          id: "uid",
          screenName: "username",
          displayName: "displayName",
          description: "description",
          photoUrl: "photoURL",
          provider: "twitter",
          providerUid: "id_str",
          createdAt: "createdAt",
          updatedAt: "updatedAt",
        };
      },
    });

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

    const user = await writeUser(mockFirestore, mockUser, mockUserCredential);

    expect(mockBatchUpdate).not.toBeCalled();
    expect(mockBatchSet).not.toBeCalled();
    expect(mockBatchCommit).toBeCalled();
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
    mockGet.mockReturnValueOnce({ size: 1 }).mockReturnValueOnce({
      id: "uid",
      exists: false,
      data: () => {
        return undefined;
      },
    });

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

    const user = await writeUser(mockFirestore, mockUser, mockUserCredential);

    expect(mockBatchUpdate).not.toBeCalled();
    expect(mockBatchSet).toBeCalledTimes(2);
    expect(mockBatchCommit).toBeCalled();
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
    mockGet.mockReturnValueOnce({ size: 0 }).mockReturnValueOnce({
      exists: false,
      data: () => {
        return {
          undefined,
        };
      },
    });

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

    await expect(
      writeUser(mockFirestore, mockUser, mockUserCredential)
    ).rejects.toThrow();
    expect(mockBatchCommit).not.toBeCalled();
  });

  it("throws an error when there is not a screen name", async () => {
    // 1st: resolve screenname duplication, 2nd: search current user
    mockGet.mockReturnValueOnce({ size: 0 }).mockReturnValueOnce({
      exists: false,
      data: () => {
        return {
          undefined,
        };
      },
    });

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

    await expect(
      writeUser(mockFirestore, mockUser, mockUserCredential)
    ).rejects.toThrow();
    expect(mockBatchCommit).not.toBeCalled();
  });

  it("writes data to the counter doc", async () => {
    // 1st: resolve screenname duplication, 2nd: search current user
    mockGet.mockReturnValueOnce({ size: 0 }).mockReturnValueOnce({
      exists: false,
      data: () => {
        return {
          undefined,
        };
      },
    });

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

    const user = await writeUser(mockFirestore, mockUser, mockUserCredential);
    expect(user).toBeTruthy();
    expect(mockBatchSet).toBeCalledTimes(2);
    expect(mockBatchSet).toHaveBeenNthCalledWith(
      2,
      "counterDoc",
      {
        count: expect.objectContaining({
          _delegate: expect.objectContaining({
            _methodName: "FieldValue.increment",
            _operand: 1,
          }),
        }),
        updatedAt: expect.objectContaining({
          _delegate: expect.objectContaining({
            _methodName: "FieldValue.serverTimestamp",
          }),
        }),
      },
      { merge: true }
    );
    expect(mockBatchCommit).toBeCalled();
  });
});
