/* eslint-disable react-hooks/rules-of-hooks */

import { expect, it } from "vitest";

import { useFirestore } from "@/lib/firebase";
import findUser from "@/services/find-user";

import { correctUserData } from "../test-utils";

const id = "IhsI5O9LyO9EFitVBKtrVkKgGMis";

const db = useFirestore();

// FEXME: FirebaseError: false for 'get'
it.skip("returns a user when the user exists user doc", async () => {
  const user = await findUser(db, id);

  expect(user).toMatchObject({
    ...correctUserData,
    id,
  });
});

// FEXME: FirebaseError: false for 'get'
it.skip("returns null when there is no user matching id", async () => {
  const user = await findUser(db, "not-exist-id");

  expect(user).toBeNull();
});
