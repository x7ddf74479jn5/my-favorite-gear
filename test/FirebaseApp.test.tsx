import { render } from "@testing-library/react";
import FirebaseApp from "FirebaseApp";
import React from "react";

const userData = {
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

const test = () => {
  return;
};
jest.mock("firebase/app", () => {
  const auth = jest.fn(() => {
    return { onAuthStateChanged: test };
  });
  const firestore = jest.fn();
  const firebase = { auth, firestore };
  return firebase;
});

jest.mock("services/find-user", () => {
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue(userData),
  };
});

jest.mock("services/write-user", () => {
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue(userData),
  };
});

jest.mock("contexts", () => {
  const UserContext = {
    Provider: jest.fn(() => {
      return <div></div>;
    }),
  };
  const FirebaseContext = {
    // eslint-disable-next-line react/display-name
    Provider: () => {
      return <></>;
    },
  };
  return { FirebaseContext, UserContext };
});

describe("", () => {
  it("", () => {
    render(
      <FirebaseApp>
        <div>test</div>
      </FirebaseApp>
    );
  });
});
