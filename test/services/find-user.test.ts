import { expect, it, vi } from "vitest";

import { collectionName } from "@/services/constants";
import findUser from "@/services/find-user";

import { correctUserData } from "../test-utils";

const mockGet = vi.fn();
const mockDoc = vi.fn();
const mockData = vi.fn();
const mockCollection = vi.fn();
const id = "uid";

let mockFirestore = {
  collection: () => {
    return;
  },
} as any;

beforeEach(() => {
  vi.resetAllMocks();
  vi.clearAllMocks();
  mockDoc.mockReturnValueOnce({ get: mockGet });
  mockCollection.mockReturnValueOnce({
    doc: mockDoc,
  });
  mockFirestore = { ...mockFirestore, collection: mockCollection };
});

it("returns a user when the user exists user doc", async () => {
  mockGet.mockReturnValueOnce({
    id: "uid",
    exists: true,
    data: mockData.mockReturnValue(correctUserData),
  });

  const user = await findUser(mockFirestore, id);

  expect(user).toMatchObject({
    ...correctUserData,
    id: "uid",
  });
  expect(mockCollection).toBeCalledWith(collectionName.users);
  expect(mockDoc).toBeCalledWith(id);
});

it("returns null when there is no user matching id", async () => {
  mockGet.mockReturnValueOnce({
    id: "",
    exists: false,
    data: mockData.mockReturnValue(undefined),
  });

  const user = await findUser(mockFirestore, id);

  expect(user).toBeNull();
});
