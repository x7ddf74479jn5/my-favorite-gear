/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MuiThemeProvider } from "@material-ui/core/styles";
import type Queries from "@testing-library/dom/types/queries";
import type { RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import theme from "asset/theme";
import React from "react";

import { FirebaseContext, UserContext } from "../refs/js/contexts";

// const withMockedRouter = (
//   router: Partial<NextRouter> = {},
//   children: React.ReactElement
// ): React.ReactElement => {
//   const mockedRouter = {
//     route: "/",
//     pathname: "/",
//     query: {},
//     asPath: "/",
//     basePath: "/",
//     isLocaleDomain: true,
//     isReady: true,
//     push: jest.fn(),
//     prefetch: jest.fn(),
//     replace: jest.fn(),
//     reload: jest.fn(),
//     back: jest.fn(),
//     beforePopState: jest.fn(),
//     events: {
//       on: jest.fn(),
//       off: jest.fn(),
//       emit: jest.fn(),
//     },
//     isFallback: false,
//     isPreview: false,
//     ...router,
//   };

//   return (
//     <RouterContext.Provider value={mockedRouter}>
//       {children}
//     </RouterContext.Provider>
//   );
// };

// const mockRouter: NextRouter = {
//   route: "/",
//   pathname: "/",
//   query: {},
//   asPath: "/",
//   basePath: "/",
//   isLocaleDomain: true,
//   isReady: true,
//   push: jest.fn(),
//   prefetch: jest.fn(),
//   replace: jest.fn(),
//   reload: jest.fn(),
//   back: jest.fn(),
//   beforePopState: jest.fn(),
//   events: {
//     on: jest.fn(),
//     off: jest.fn(),
//     emit: jest.fn(),
//   },
//   isFallback: false,
//   isPreview: false,
// };

// const renderWithRouter = (ui, { route = "/" } = {}) => {
//   window.history.pushState({}, "Test page", route);

//   return render(ui, { wrapper: BrowserRouter });
// };

const mockFirebaseContextValue = {
  auth: null,
  db: null,
};

const mockUserContextValue = {
  user: null,
  credential: null,
  setCredential: () => {
    return undefined;
  },
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

const reTestCase = {
  anyWord: expect.stringMatching(/\w+/),
  anyImage: expect.stringMatching(
    /^(data:image\/gif)|\.(png|webp|jpeg|jpg|svg)$/
  ),
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, reTestCase };
