import React from "react";
import { describe, expect, it } from "vitest";

import ReviewStars from "@/components/common/card/ReviewStars";

import { render } from "../../../test-utils";

describe("ReviewStars", () => {
  it("should match snapshot", () => {
    const renderResult = render(<ReviewStars reviewAverage={1} />);
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("should render correctly", () => {
    const renderResult = render(<ReviewStars reviewAverage={1} />);
    expect(renderResult.container).not.toBeEmptyDOMElement();

    renderResult.rerender(<ReviewStars reviewAverage={1.5} />);
    expect(renderResult.container).not.toBeEmptyDOMElement();
  });

  it("should not render if provided invalid arguments", () => {
    const renderResult = render(<ReviewStars reviewAverage={0} />);
    expect(renderResult.container).toBeEmptyDOMElement();

    renderResult.rerender(<ReviewStars reviewAverage={5.5} />);
    expect(renderResult.container).toBeEmptyDOMElement();
  });
});
