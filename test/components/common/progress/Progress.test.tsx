import React from "react";
import { describe, expect, it } from "vitest";

import Progress from "@/components/common/progress/Progress";

import { render } from "../../../test-utils";

describe("Progress", () => {
  it("matches snapshot", () => {
    const renderResult = render(<Progress />);

    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const renderResult = render(<Progress />);
    expect(renderResult.container.firstChild).toHaveAttribute(
      "class",
      expect.stringContaining("styledContainer")
    );

    expect(renderResult.getByText("読み込み中")).toBeInTheDocument();
    expect(renderResult.container.getElementsByTagName("svg")).toBeTruthy();
    expect(renderResult.container.getElementsByTagName("circle")).toBeTruthy();
  });
});
