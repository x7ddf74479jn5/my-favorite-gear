/**
 * @jest-environment node
 */

import * as firebase from "@firebase/rules-unit-testing";
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import { collectionName } from "services/constants";
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

jest.setTimeout(15000);

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

describe("/users/{userId}", () => {
  describe("ユーザー認証情報の検証", () => {
    test("自分のuidと同様のドキュメントIDのユーザー情報だけを閲覧、作成、編集可能", async () => {
      const db = createAuthApp({ uid: "uid" });
      const userDocumentRef = db.collection(collectionName.users).doc("uid");
      await firebase.assertSucceeds(userDocumentRef.set(correctUserData));
      await firebase.assertSucceeds(userDocumentRef.get());
      await firebase.assertSucceeds(
        userDocumentRef.update({ screenName: "newUid" })
      );
    });

    test("自分のuidと異なるドキュメントは閲覧、作成、編集が出来ない", async () => {
      createAdminApp()
        .collection(collectionName.users)
        .doc("uid_1")
        .set(adminData);
      const db = createAuthApp({ uid: "uid_2" });
      const userDocumentRef = db.collection(collectionName.users).doc("uid_1");
      await firebase.assertFails(userDocumentRef.set(correctUserData));
      await firebase.assertFails(userDocumentRef.get());
      await firebase.assertFails(
        userDocumentRef.update({ screenName: "uid_2" })
      );
    });

    test("screenNameが合致したドキュメントは取得できる", async () => {
      createAdminApp()
        .collection(collectionName.users)
        .doc("uid_1")
        .set(adminData);
      const db = createAuthApp({ uid: "uid_2" });
      const matchedUserDocuments = db
        .collection(collectionName.users)
        .where("screenName", "==", "screenName");
      await firebase.assertSucceeds(matchedUserDocuments.get());
    });
  });

  describe("スキーマの検証", () => {
    test("正しくないスキーマの場合は作成できない", async () => {
      const db = createAuthApp({ uid: "uid" });
      const userDocumentRef = db.collection(collectionName.users).doc("uid");

      // 想定外のプロパティがある場合
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, place: "japan" })
      );

      const insufficientData = {
        displayName: "displayName",
        description: "description",
        photoUrl: "https://photoUrl.com",
        provider: "twitter",
        providerUid: "providerUid",
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      // プロパティが不足している場合
      await firebase.assertFails(userDocumentRef.set(insufficientData));

      // プロパティの型が異なる場合
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, screenName: 1234 })
      );
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, displayName: 1234 })
      );
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, description: 1234 })
      );
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, provider: 1234 })
      );
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, photoUrl: 1234 })
      );
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, provider: 1234 })
      );
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, providerUid: 1234 })
      );
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, createdAt: "1" })
      );
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, updatedAt: "1" })
      );
    });

    test("正しくないスキーマの場合は編集できない", async () => {
      createAdminApp()
        .collection(collectionName.users)
        .doc("uid")
        .set(adminData);
      const db = createAuthApp({ uid: "uid" });
      const userDocumentRef = db.collection(collectionName.users).doc("uid");

      // 想定外のプロパティがある場合
      await firebase.assertFails(userDocumentRef.update({ place: "japan" }));

      // プロパティの型が異なる場合
      await firebase.assertFails(userDocumentRef.update({ screenName: 1234 }));
      await firebase.assertFails(userDocumentRef.update({ displayName: 1234 }));
      await firebase.assertFails(userDocumentRef.update({ description: 1234 }));
      await firebase.assertFails(userDocumentRef.update({ provider: 1234 }));
      await firebase.assertFails(userDocumentRef.update({ photoUrl: 1234 }));
      await firebase.assertFails(userDocumentRef.update({ provider: 1234 }));
      await firebase.assertFails(userDocumentRef.update({ providerUid: 1234 }));
      await firebase.assertFails(userDocumentRef.update({ createdAt: "1" }));
      await firebase.assertFails(userDocumentRef.update({ updatedAt: "1" }));
    });
  });

  describe("値のバリデーション", () => {
    test("screenNameは1文字以上である", async () => {
      const db = createAuthApp({ uid: "uid" });
      const userDocumentRef = db.collection(collectionName.users).doc("uid");

      await firebase.assertSucceeds(
        userDocumentRef.set({
          ...correctUserData,
          screenName: "screenName",
        })
      );

      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, screenName: "" })
      );
    });

    test("displayは1文字以上である", async () => {
      const db = createAuthApp({ uid: "uid" });
      const userDocumentRef = db.collection(collectionName.users).doc("uid");

      await firebase.assertSucceeds(
        userDocumentRef.set({
          ...correctUserData,
          displayName: "displayName",
        })
      );

      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, displayName: "" })
      );
    });

    test("photoUrlはURL(https)である", async () => {
      const db = createAuthApp({ uid: "uid" });
      const userDocumentRef = db.collection(collectionName.users).doc("uid");

      await firebase.assertSucceeds(
        userDocumentRef.set({
          ...correctUserData,
          photoUrl: "https://example.com",
        })
      );

      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, photoUrl: "" })
      );
      await firebase.assertFails(
        userDocumentRef.set({
          ...correctUserData,
          photUrl: "http://exmaple.com",
        })
      );
    });

    test("providerはtwitterである", async () => {
      const db = createAuthApp({ uid: "uid" });
      const userDocumentRef = db.collection(collectionName.users).doc("uid");

      await firebase.assertSucceeds(
        userDocumentRef.set({
          ...correctUserData,
          provider: "twitter",
        })
      );

      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, provider: "" })
      );
      await firebase.assertFails(
        userDocumentRef.set({
          ...correctUserData,
          provider: "github",
        })
      );
    });

    test("providerUidは1文字以上である", async () => {
      const db = createAuthApp({ uid: "uid" });
      const userDocumentRef = db.collection(collectionName.users).doc("uid");

      await firebase.assertSucceeds(
        userDocumentRef.set({
          ...correctUserData,
          providerUid: "providerUid",
        })
      );

      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, providerUid: "" })
      );
    });
  });
});

describe("/docCounters/users", () => {
  const correctCounterData = {
    count: 1,
    updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
  };

  test("ユーザーが認証済みの場合は書き込みできる", async () => {
    const db = createAuthApp({ uid: "uid" });
    const usersDocumentRef = db
      .collection(collectionName.docCounters)
      .doc("users");

    await firebase.assertSucceeds(usersDocumentRef.set(correctCounterData));
  });

  test("正しくないスキーマの場合は書き込みできない", async () => {
    const db = createAuthApp({ uid: "uid" });
    const usersDocumentRef = db
      .collection(collectionName.docCounters)
      .doc("users");

    await firebase.assertFails(
      usersDocumentRef.set({
        ...correctCounterData,
        counter: "1",
      })
    );
    await firebase.assertFails(
      usersDocumentRef.set({
        ...correctCounterData,
        updatedAt: "1",
      })
    );
    await firebase.assertFails(
      usersDocumentRef.set({
        ...correctCounterData,
        createdAt: firebase.firestore.Timestamp.now(),
      })
    );
    await firebase.assertFails(
      usersDocumentRef.set({
        counter: 1,
      })
    );
  });
});

describe("/playlists/{playlistId}", () => {
  const correctPlaylistData = {
    id: "uid",
    twitterId: "twitterId",
    image: "image_normal",
    songs: [],
    songsCount: 8,
    updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
  };
  const adminPlaylistData = {
    id: "uid",
    twitterId: "twitterId",
    image: "image_normal",
    songs: [],
    songsCount: 8,
    updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
  };
  describe("ユーザー認証情報の検証", () => {
    test("自分のuidと同様のドキュメントIDのユーザー情報だけを閲覧、作成、編集可能", async () => {
      const db = createAuthApp({ uid: "uid" });
      const playlistDocumentRef = db
        .collection(collectionName.playlists)
        .doc("uid");
      await firebase.assertSucceeds(
        playlistDocumentRef.set(correctPlaylistData)
      );
      await firebase.assertSucceeds(playlistDocumentRef.get());
      await firebase.assertSucceeds(
        playlistDocumentRef.update({ image: "newImage" })
      );
    });

    test("自分のuidと異なるドキュメントは閲覧、作成、編集が出来ない", async () => {
      createAdminApp()
        .collection(collectionName.playlists)
        .doc("uid_1")
        .set(adminPlaylistData);
      const db = createAuthApp({ uid: "uid_2" });
      const playlistDocumentRef = db
        .collection(collectionName.users)
        .doc("uid_1");
      await firebase.assertFails(playlistDocumentRef.set(correctPlaylistData));
      await firebase.assertFails(playlistDocumentRef.get());
      await firebase.assertFails(
        playlistDocumentRef.update({ image: "newImage" })
      );
    });
  });
});
