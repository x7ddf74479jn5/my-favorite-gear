import React from "react";
import { describe, expect, it } from "vitest";

import Signin from "@/components/Signin";

import { render } from "../../test-utils";

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
    expect(renderResult.getByRole("heading", { level: 4 })).toHaveTextContent(
      "ログイン"
    );
    expect(renderResult.container.getElementsByTagName("p")).toHaveLength(1);
  });
});
