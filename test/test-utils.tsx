import { MuiThemeProvider } from "@material-ui/core/styles";
import type Queries from "@testing-library/dom/types/queries";
import type { RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import theme from "asset/theme";
import type { FirebaseContextValue, UserContextValue } from "contexts";
import { FirebaseContext, UserContext } from "contexts";
import firebase from "firebase/app";
import React from "react";
import type { FavoriteList } from "services/models/favoriteList";
import type { Gear } from "services/models/gear";
import type { User } from "services/models/user";

import { initializeFirebase } from "../firebase";

initializeFirebase();

export const correctUserData: User = {
  id: "id",
  screenName: "screenName",
  displayName: "displayName",
  description: "description",
  photoUrl: "https://photoUrl.com",
  provider: "twitter",
  providerUid: "providerUid",
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
};

export const mockFirebaseContextValue: FirebaseContextValue = {
  auth: firebase.auth(),
  db: firebase.firestore(),
};

const mockUserContextValue: UserContextValue = {
  user: correctUserData,
  credential: null,
  setCredential: () => {
    return undefined;
  },
};

export const withUserAuth = (
  children: React.ReactElement,
  firebaseContextValue: FirebaseContextValue = mockFirebaseContextValue,
  userContextValue: UserContextValue = mockUserContextValue
) => {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseContext.Provider value={firebaseContextValue}>
        <UserContext.Provider value={userContextValue}>
          {children}
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </MuiThemeProvider>
  );
};

export const Providers: React.ComponentType<{ children?: any }> = ({
  children,
}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <FirebaseContext.Provider value={mockFirebaseContextValue}>
        <UserContext.Provider value={mockUserContextValue}>
          {children}
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </MuiThemeProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options = {}
): RenderResult<typeof Queries, HTMLElement> => {
  return render(ui, { wrapper: Providers, ...options });
};

export const reTestCase = {
  anyWord: expect.stringMatching(/\w+/),
  anyImage: expect.stringMatching(
    /^(data:image\/gif)|\.(png|webp|jpeg|jpg|svg)$/
  ),
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

const seedGearsToFavoriteList = () => {
  const GEAR_COUNT = 8;
  const gears: Gear[] = [];
  for (let i = 0; i < GEAR_COUNT; i++) {
    gears.push({
      productId: `productId ${i + 1}`,
      productName: `productName ${i + 1}`,
      makerName: `makerName ${i + 1}`,
      brandName: `brandName ${i + 1}`,
      productUrlPC: `productUrlPC ${i + 1}`,
      mediumImageUrl: `mediumImageUrl ${i + 1}`,
      affiliateUrl: `https://www.affiliate.com/${i + 1}`,
      amazonUrl: `https://www.amazon.com/${i + 1}`,
      averagePrice: `averagePrice ${i + 1}`,
      genreName: `genreName ${i + 1}`,
      reviewAverage: 1,
    });
  }
  return gears;
};

export const testGear: Gear = {
  productId: "productId",
  productName: "productName",
  makerName: "makerName",
  brandName: "brandName",
  productUrlPC: "productUrlPC",
  mediumImageUrl: "mediumImageUrl",
  affiliateUrl: "https://www.affiliate.com",
  amazonUrl: `https://www.amazon.com/`,
  averagePrice: "averagePrice",
  genreName: "genreName",
  reviewAverage: 1,
};

export const testFavoriteList: FavoriteList = {
  id: "id",
  twitterId: "twitterId",
  image: "image_normal",
  gears: seedGearsToFavoriteList(),
  gearsCount: 8,
  updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
};
