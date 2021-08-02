import { render } from "@testing-library/react";
import App from "App";
import type { UserContextValue } from "contexts";
import React from "react";
import { MemoryRouter } from "react-router";
import { blankUser } from "services/models/user";

import { withUserAuth } from "../test-utils";

jest.mock("components/Signin", () => {
  const Singnin = () => {
    return <div>Signin</div>;
  };
  return Singnin;
});

jest.mock("components/FavoriteList", () => {
  const FavoriteList = () => {
    return <div>FavoriteList</div>;
  };
  return FavoriteList;
});

jest.mock("components/FavoriteLists", () => {
  const FavoriteLists = () => {
    return <div>FavoriteLists</div>;
  };
  return FavoriteLists;
});

jest.mock("components/MakeFavoriteList", () => {
  const MakeFavoriteList = () => {
    return <div>MakeFavoriteLists</div>;
  };
  return MakeFavoriteList;
});

const mockUserContextValue: UserContextValue = {
  user: null,
  credential: {
    credential: null,
    user: null,
  },
  setCredential: jest.fn(),
};

describe("App", () => {
  it("renders root with an auth user", () => {
    const mockUserContextValue: UserContextValue = {
      user: blankUser,
      credential: {
        credential: null,
        user: null,
      },
      setCredential: jest.fn(),
    };
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
        undefined,
        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("MakeFavoriteLists");
  });

  it("renders root without an auth user", () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
        undefined,

        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("Signin");
  });

  it("renders favoriteLists", () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/favoriteLists"]}>
          <App />
        </MemoryRouter>,
        undefined,
        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("FavoriteLists");
  });

  it("renders favoriteList", () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/favoriteList/1"]}>
          <App />
        </MemoryRouter>,
        undefined,
        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("FavoriteList");
  });

  it("redirects to root when router path doesn't match any defined path", () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={[""]}>
          <App />
        </MemoryRouter>,
        undefined,
        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("Signin");
  });
});
