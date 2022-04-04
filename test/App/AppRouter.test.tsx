import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { AppRouter } from "@/AppRouter";
import type { UserContextValue } from "@/contexts";
import { blankUser } from "@/services/models/user";

import { withUserAuth } from "../test-utils";

vi.mock("components/Signin", () => {
  const Singnin = () => {
    return <div>Signin</div>;
  };
  return Singnin;
});

vi.mock("components/FavoriteList", () => {
  const FavoriteList = () => {
    return <div>FavoriteList</div>;
  };
  return FavoriteList;
});

vi.mock("components/FavoriteLists", () => {
  const FavoriteLists = () => {
    return <div>FavoriteLists</div>;
  };
  return FavoriteLists;
});

vi.mock("components/MakeFavoriteList", () => {
  const MakeFavoriteList = () => {
    return <div>MakeFavoriteLists</div>;
  };
  return MakeFavoriteList;
});

const mockUserContextValue: UserContextValue = {
  user: null,
  credential: null,
  setCredential: vi.fn(),
};

describe("AppRouter", () => {
  it("renders root with an auth user", () => {
    const mockUserContextValue: UserContextValue = {
      user: blankUser,
      credential: null,
      setCredential: vi.fn(),
    };
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/"]}>
          <AppRouter />
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
          <AppRouter />
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
          <AppRouter />
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
          <AppRouter />
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
          <AppRouter />
        </MemoryRouter>,
        undefined,
        mockUserContextValue
      )
    );

    expect(renderResult.container).toHaveTextContent("Signin");
  });
});
