/* eslint-disable @typescript-eslint/no-var-requires */

import * as firebase from "@firebase/rules-unit-testing";
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import type { User } from "services/models/user";

const PROJECT_ID = "dev-my-favorite-gear";
const RULES_PATH = path.resolve("firestore.rules");

const createAuthApp = (auth?: { uid: string }) => {
  return firebase
    .initializeTestApp({ projectId: PROJECT_ID, auth: auth })
    .firestore();
};

const createAdminApp = () => {
  return firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
};

beforeAll(async () => {
  await firebase.loadFirestoreRules({
    projectId: PROJECT_ID,
    rules: fs.readFileSync(RULES_PATH, "utf8"),
  });
});

afterEach(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

afterAll(async () => {
  await Promise.all(
    firebase.apps().map((app) => {
      return app.delete();
    })
  );
});

jest.setTimeout(10000);

const correctUserData: User = {
  screenName: "screenName",
  displayName: "displayName",
  description: "description",
  photoUrl: "https://photoUrl.com",
  provider: "twitter",
  providerUid: "providerUid",
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
};

describe("ユーザー認証情報の検証", () => {
  test("自分のuidと同様のドキュメントIDのユーザー情報だけを閲覧、作成、編集可能", async () => {
    const db = createAuthApp({ uid: "uid" });
    const userDocumentRef = db.collection("users").doc("uid");
    await firebase.assertSucceeds(userDocumentRef.set(correctUserData));
    await firebase.assertSucceeds(userDocumentRef.get());
    await firebase.assertSucceeds(
      userDocumentRef.update({ screenName: "newUid" })
    );
  });

  const adminData: User = {
    screenName: "screenName",
    displayName: "displayName",
    description: "description",
    photoUrl: "https://photoUrl.com",
    provider: "twitter",
    providerUid: "providerUid",
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
  };

  test("自分のuidと異なるドキュメントは閲覧、作成、編集が出来ない", async () => {
    createAdminApp().collection("users").doc("uid_1").set(adminData);
    const db = createAuthApp({ uid: "uid_2" });
    const userDocumentRef = db.collection("users").doc("uid_1");
    await firebase.assertFails(userDocumentRef.set(correctUserData));
    await firebase.assertFails(userDocumentRef.get());
    await firebase.assertFails(userDocumentRef.update({ screenName: "uid_2" }));
  });
});
