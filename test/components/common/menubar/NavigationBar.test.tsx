import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavigationBar from "components/common/menubar/NavigationBar";
import type { FirebaseContextValue, UserContextValue } from "contexts";
import { createMemoryHistory } from "history";
import React from "react";
import { MemoryRouter } from "react-router";
import { Router } from "react-router";
import { blankUser } from "services/models/user";

import { waitFor, withUserAuth } from "../../../test-utils";

const mockSignOut = jest.fn();
const mockAuth = {
  signOut: mockSignOut,
};

describe("NavigationBar", () => {
  it("renders without auth", () => {
    const mockFirebaseContextValue: FirebaseContextValue = {
      auth: null,
      db: null,
    };

    const mockUserContextValue: UserContextValue = {
      user: null,
      credential: {
        credential: null,
        user: null,
      },
      setCredential: jest.fn(),
    };
    const renderResult = render(
      withUserAuth(
        <MemoryRouter initialEntries={["/"]}>
          <NavigationBar />
        </MemoryRouter>,
        mockFirebaseContextValue,
        mockUserContextValue
      )
    );

    expect(renderResult.getByRole("banner")).toHaveAttribute(
      "class",
      expect.stringContaining("appbar")
    );
    const linkElement = renderResult.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/");
    expect(linkElement).toHaveAttribute(
      "class",
      expect.stringContaining("titleLink")
    );
    expect(renderResult.getByRole("heading", { level: 6 })).toHaveTextContent(
      "My Favorite Gear"
    );
    expect(renderResult.container).not.toHaveTextContent("ログアウト");
  });

  it("renders with auth", async () => {
    const mockFirebaseContextValue: FirebaseContextValue = {
      auth: mockAuth as any,
      db: null,
    };

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
          <NavigationBar />
        </MemoryRouter>,
        mockFirebaseContextValue,
        mockUserContextValue
      )
    );

    const buttonElement = renderResult.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute(
      "aria-label",
      expect.stringMatching("account of current user")
    );

    expect(renderResult.getByText("ログアウト")).toBeInTheDocument();
  });

  it("opens menu when button is clicked", async () => {
    const mockFirebaseContextValue: FirebaseContextValue = {
      auth: mockAuth as any,
      db: null,
    };

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
          <NavigationBar />
        </MemoryRouter>,
        mockFirebaseContextValue,
        mockUserContextValue
      )
    );

    const buttonElement = renderResult.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(renderResult.queryAllByRole("menuitem")).toHaveLength(0);

    userEvent.click(buttonElement);
    await waitFor(() => {
      renderResult.getAllByRole("menuitem");
    });
    const menuItems = renderResult.getAllByRole("menuitem");

    expect(menuItems).toHaveLength(4);

    const menuElement = renderResult.getByRole("menu");
    userEvent.click(menuItems[0]);
    await waitFor(() => {
      return expect(renderResult.queryAllByRole("menuitem")).toHaveLength(0);
    });
    expect(menuElement).not.toBeVisible();
  });

  it("change routing correctly", async () => {
    const mockFirebaseContextValue: FirebaseContextValue = {
      auth: mockAuth as any,
      db: null,
    };

    const mockUserContextValue: UserContextValue = {
      user: blankUser,
      credential: {
        credential: null,
        user: null,
      },
      setCredential: jest.fn(),
    };

    const history = createMemoryHistory();

    const renderResult = render(
      withUserAuth(
        <Router history={history}>
          <NavigationBar />
        </Router>,
        mockFirebaseContextValue,
        mockUserContextValue
      )
    );

    const buttonElement = renderResult.getByRole("button");

    userEvent.click(buttonElement);
    await waitFor(() => {
      renderResult.getAllByRole("menuitem");
    });
    const menuItems = renderResult.getAllByRole("menuitem");

    expect(menuItems).toHaveLength(4);

    const routes = ["/", "/playlist", "/playlists", "/"];

    routes.forEach((route, index) => {
      userEvent.click(menuItems[index]);
      expect(history.location.pathname).toMatch(route);
    });

    expect(mockSignOut).toBeCalled();
  });
});