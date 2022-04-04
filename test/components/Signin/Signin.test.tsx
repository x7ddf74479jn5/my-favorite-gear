import React from "react";
import { describe, expect, it, vi } from "vitest";

import Signin from "@/components/Signin";

import { render } from "../../test-utils";

vi.mock("react-firebaseui/StyledFirebaseAuth", () => {
  const StyledFirebaseAuth = () => {
    return <div>StyledFirebaseAuth</div>;
  };
  return StyledFirebaseAuth;
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
