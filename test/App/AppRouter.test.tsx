import { render, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { AppRouter } from "@/AppRouter";
import type { UserContextValue } from "@/contexts";
import { blankUser } from "@/services/models/user";

import { withUserAuth } from "../test-utils";

const mockUserContextValue: UserContextValue = {
  user: null,
  credential: null,
  setCredential: vi.fn(),
};

describe("AppRouter", () => {
  it("renders root with an auth user", async () => {
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

    await waitFor(() =>
      expect(renderResult.container).toHaveTextContent("商品検索")
    );
  });

  it("renders root without an auth user", async () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/"]}>
          <AppRouter />
        </MemoryRouter>,
        undefined,

        mockUserContextValue
      )
    );

    await waitFor(() =>
      expect(renderResult.container).toHaveTextContent("読み込み中")
    );
  });

  it("renders favoriteLists", async () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/favoriteLists"]}>
          <AppRouter />
        </MemoryRouter>,
        undefined,
        mockUserContextValue
      )
    );

    await waitFor(() =>
      expect(renderResult.container).toHaveTextContent(
        "みんなのMy Favorite gear"
      )
    );
  });

  it("renders favoriteList", async () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/favoriteList/1"]}>
          <AppRouter />
        </MemoryRouter>,
        undefined,
        { ...mockUserContextValue, user: { ...blankUser, screenName: "user" } }
      )
    );

    await waitFor(() =>
      expect(renderResult.container).toHaveTextContent("userのMy Favorite gear")
    );
  });

  it("redirects to root when router path doesn't match any defined path", async () => {
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={[""]}>
          <AppRouter />
        </MemoryRouter>,
        undefined,
        mockUserContextValue
      )
    );

    await waitFor(() =>
      expect(renderResult.container).toHaveTextContent("ログイン")
    );
  });
});
