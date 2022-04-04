/* eslint-disable react-hooks/rules-of-hooks */
import { ThemeProvider } from "@mui/material/styles";
import type Queries from "@testing-library/dom/types/queries";
import type { RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import React from "react";

import theme from "@/asset/theme";
import type { FirebaseContextValue, UserContextValue } from "@/contexts";
import { FirebaseContext, UserContext } from "@/contexts";
import { useAuth, useFirestore } from "@/lib/firebase";
import type { FavoriteList } from "@/services/models/favoriteList";
import type { Gear } from "@/services/models/gear";
import type { User } from "@/services/models/user";

export const correctUserData: User = {
  id: "id",
  screenName: "screenName",
  displayName: "displayName",
  description: "description",
  photoUrl: "https://photoUrl.com",
  provider: "twitter",
  providerUid: "providerUid",
  createdAt: Timestamp.fromDate(new Date()),
  updatedAt: Timestamp.fromDate(new Date()),
};

export const mockFirebaseContextValue: FirebaseContextValue = {
  auth: useAuth(),
  db: useFirestore(),
  isLoading: false,
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
    <ThemeProvider theme={theme}>
      <FirebaseContext.Provider value={firebaseContextValue}>
        <UserContext.Provider value={userContextValue}>
          {children}
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </ThemeProvider>
  );
};

export const Providers: React.ComponentType<{ children?: any }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <FirebaseContext.Provider value={mockFirebaseContextValue}>
        <UserContext.Provider value={mockUserContextValue}>
          {children}
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </ThemeProvider>
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
  updatedAt: Timestamp.fromDate(new Date()),
};
