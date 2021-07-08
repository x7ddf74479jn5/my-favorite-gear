import Signin from "components/Signin";
import React from "react";

import { render } from "../../test-utils";

jest.mock("react-firebaseui/StyledFirebaseAuth", () => {
  const StyledFirebaseAuth = () => {
    return <div>StyledFirebaseAuth</div>;
  };
  return StyledFirebaseAuth;
});

jest.mock("firebase/app", () => {
  const firebase = {
    auth: {
      TwitterAuthProvider: {
        PROVIDER_ID: "",
      },
    },
  };
  return firebase;
});

describe("Signin", () => {
  it("matches snapshot", () => {
    const renderResult = render(<Signin />);
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const renderResult = render(<Signin />);

    expect(renderResult.container.firstElementChild).toHaveAttribute(
      "class",
      expect.stringContaining("root")
    );
    expect(renderResult.getByRole("heading", { level: 4 }));
    expect(renderResult.container.getElementsByTagName("p")).toHaveLength(1);
  });
});
