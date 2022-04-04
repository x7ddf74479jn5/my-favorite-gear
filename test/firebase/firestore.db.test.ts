/**
 * @jest-environment node
 */

import { serverTimestamp } from "@firebase/firestore";
import * as firebase from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import * as fs from "fs";
import * as path from "path";
import { afterAll, afterEach, beforeAll, describe } from "vitest";

import { collectionName } from "@/services/constants";
import type { User } from "@/services/models/user";

const PROJECT_ID = "dev-my-favorite-gear";
const RULES_PATH = path.resolve(
  process.cwd(),
  "configs",
  "origin-firestore.rules"
);

let testEnv: firebase.RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await firebase.initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: fs.readFileSync(RULES_PATH, "utf8"),
    },
  });
});

afterEach(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  testEnv.cleanup();
});

const correctUserData: User = {
  screenName: "screenName",
  displayName: "displayName",
  description: "description",
  photoUrl: "https://photoUrl.com",
  provider: "twitter",
  providerUid: "providerUid",
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
};

describe("/users/{userId}", () => {
  describe("ユーザー認証情報の検証", () => {
    test("自分のuidと同様のドキュメントIDのユーザー情報だけを閲覧、作成、編集可能", async () => {
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const userDocumentRef = doc(db, collectionName.users, "uid");
      await firebase.assertSucceeds(setDoc(userDocumentRef, correctUserData));
      await firebase.assertSucceeds(getDoc(userDocumentRef));
      await firebase.assertSucceeds(
        updateDoc(userDocumentRef, { screenName: "newUid" })
      );
    });

    test("自分のuidと異なるドキュメントは閲覧、作成、編集が出来ない", async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        setDoc(doc(db, collectionName.users, "admin"), correctUserData);
      });
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const userDocumentRef = db.collection(collectionName.users).doc("admin");
      await firebase.assertFails(userDocumentRef.set(correctUserData));
      await firebase.assertFails(userDocumentRef.get());
      await firebase.assertFails(userDocumentRef.update({ screenName: "uid" }));
    });

    test("screenNameが合致したドキュメントは取得できる", async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        setDoc(doc(db, collectionName.users, "admin"), correctUserData);
      });
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const matchedUserDocuments = db
        .collection(collectionName.users)
        .where("screenName", "==", "screenName");
      await firebase.assertSucceeds(matchedUserDocuments.get());
    });
  });

  describe("スキーマの検証", () => {
    test("正しくないスキーマの場合は作成できない", async () => {
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const userDocumentRef = db.collection(collectionName.users).doc("uid");

      // 想定外のプロパティがある場合
      await firebase.assertFails(
        userDocumentRef.set({ ...correctUserData, place: "japan" })
      );

      const incorrectData = {
        displayName: "displayName",
        description: "description",
        photoUrl: "https://photoUrl.com",
        provider: "twitter",
        providerUid: "providerUid",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // プロパティが不足している場合
      await firebase.assertFails(userDocumentRef.set(incorrectData));

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
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        setDoc(doc(db, collectionName.users, "uid"), correctUserData);
      });
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
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
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
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
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
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
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
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
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
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
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
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
    updatedAt: serverTimestamp(),
  };

  test("ユーザーが認証済みの場合は書き込みできる", async () => {
    const context = testEnv.authenticatedContext("uid");
    const db = context.firestore();
    const usersDocumentRef = db
      .collection(collectionName.docCounters)
      .doc("users");

    await firebase.assertSucceeds(usersDocumentRef.set(correctCounterData));
  });

  test("正しくないスキーマの場合は書き込みできない", async () => {
    const context = testEnv.authenticatedContext("uid");
    const db = context.firestore();
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
        createdAt: serverTimestamp(),
      })
    );
    await firebase.assertFails(
      usersDocumentRef.set({
        counter: 1,
      })
    );
  });
});

describe("/favoriteLists/{favoriteListId}", () => {
  const correctFavoriteListData = {
    twitterId: "twitterId",
    image: "image_normal",
    gears: [],
    gearsCount: 0,
    updatedAt: serverTimestamp(),
  };
  const adminFavoriteListData = {
    twitterId: "twitterId",
    image: "image_normal",
    gears: [],
    gearsCount: 8,
    updatedAt: serverTimestamp(),
  };

  describe("ユーザー認証情報の検証", () => {
    test("自分のuidと同様のドキュメントIDのユーザー情報だけを閲覧、作成、編集可能", async () => {
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const favoriteListDocumentRef = db
        .collection(collectionName.favoriteLists)
        .doc("uid");
      await firebase.assertSucceeds(
        favoriteListDocumentRef.set(correctFavoriteListData)
      );
      await firebase.assertSucceeds(favoriteListDocumentRef.get());
      await firebase.assertSucceeds(
        favoriteListDocumentRef.update({ image: "newImage" })
      );
    });

    test("完成したお気に入りリストは認証済みユーザーなら取得できる", async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        setDoc(
          doc(db, collectionName.favoriteLists, "admin"),
          adminFavoriteListData
        );
      });
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const favoriteListCollectionRef = db.collection(
        collectionName.favoriteLists
      );
      await firebase.assertFails(favoriteListCollectionRef.get());
      await firebase.assertSucceeds(favoriteListCollectionRef.limit(20).get());
    });

    test("自分のuidと異なるドキュメントは閲覧、作成、編集が出来ない", async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        setDoc(
          doc(db, collectionName.favoriteLists, "admin"),
          adminFavoriteListData
        );
      });
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const favoriteListDocumentRef = db
        .collection(collectionName.favoriteLists)
        .doc("admin");
      await firebase.assertFails(
        favoriteListDocumentRef.set(correctFavoriteListData)
      );
      await firebase.assertFails(favoriteListDocumentRef.get());
      await firebase.assertFails(
        favoriteListDocumentRef.update({ image: "newImage" })
      );
    });
  });

  describe("スキーマの検証", () => {
    test("正しくないスキーマの場合は作成できない", async () => {
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const favoriteListDocumentRef = db
        .collection(collectionName.favoriteLists)
        .doc("uid");

      // 想定外のプロパティがある場合
      await firebase.assertFails(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          place: "japan",
        })
      );

      const incorrectData = {
        id: "uid",
      };

      // プロパティが不足している場合
      await firebase.assertFails(favoriteListDocumentRef.set(incorrectData));

      // プロパティの型が異なる場合
      await firebase.assertFails(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          gears: 1234,
        })
      );
      await firebase.assertFails(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          gearsCount: "1234",
        })
      );
      await firebase.assertFails(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          image: 1234,
        })
      );
      await firebase.assertFails(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          twitterId: 1234,
        })
      );
      await firebase.assertFails(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          updatedAt: "1",
        })
      );
    });

    test("正しくないスキーマの場合は編集できない", async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        setDoc(
          doc(db, collectionName.favoriteLists, "admin"),
          adminFavoriteListData
        );
      });
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const favoriteListDocumentRef = db
        .collection(collectionName.favoriteLists)
        .doc("uid");

      // 想定外のプロパティがある場合
      await firebase.assertFails(
        favoriteListDocumentRef.update({ place: "japan" })
      );

      // プロパティの型が異なる場合
      await firebase.assertFails(
        favoriteListDocumentRef.update({ gear: 1234 })
      );
      await firebase.assertFails(
        favoriteListDocumentRef.update({ gearsCount: "1234" })
      );
      await firebase.assertFails(
        favoriteListDocumentRef.update({ image: 1234 })
      );
      await firebase.assertFails(
        favoriteListDocumentRef.update({ twitterId: 1234 })
      );
      await firebase.assertFails(
        favoriteListDocumentRef.update({ createdAt: "1" })
      );
      await firebase.assertFails(
        favoriteListDocumentRef.update({ updatedAt: "1" })
      );
    });
  });

  describe("値のバリデーション", () => {
    test("gears, gearsCountの配列長は0以上8以下であり一致する", async () => {
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const favoriteListDocumentRef = db
        .collection(collectionName.favoriteLists)
        .doc("uid");

      await firebase.assertSucceeds(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          gears: [],
          gearsCount: 0,
        })
      );

      await firebase.assertSucceeds(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          gears: [1, 2, 3, 4, 5, 6, 7, 8],
          gearsCount: 8,
        })
      );

      await firebase.assertFails(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          gears: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          gearsCount: 9,
        })
      );

      await firebase.assertFails(
        favoriteListDocumentRef.set({
          ...correctUserData,
          gears: [1, 2, 3, 4, 5, 6, 7, 8],
          gearsCount: 0,
        })
      );
    });

    test("imageは0文字以上である", async () => {
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const favoriteListDocumentRef = db
        .collection(collectionName.favoriteLists)
        .doc("uid");

      await firebase.assertSucceeds(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          image: "image",
        })
      );

      await firebase.assertSucceeds(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          image: "",
        })
      );
    });

    test("twitterIdは1文字以上である", async () => {
      const context = testEnv.authenticatedContext("uid");
      const db = context.firestore();
      const favoriteListDocumentRef = db
        .collection(collectionName.favoriteLists)
        .doc("uid");

      await firebase.assertSucceeds(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          twitterId: "twitterId",
        })
      );

      await firebase.assertFails(
        favoriteListDocumentRef.set({
          ...correctFavoriteListData,
          twitterId: "",
        })
      );
    });
  });
});
