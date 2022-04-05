import "@testing-library/jest-dom";

import React from "react";
import { describe, expect, it, vi } from "vitest";

import SearchBox from "@/components/MakeFavoriteList/SearchBox";

import { fireEvent, render } from "../../test-utils";

const mockHandler = vi.fn();

describe("SearchBox", () => {
  it("matches snapshot", () => {
    const renderResult = render(<SearchBox handler={mockHandler} />);

    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const renderResult = render(<SearchBox handler={mockHandler} />);

    expect(
      renderResult.container.getElementsByTagName("form")[0]
    ).toHaveAttribute("class", expect.stringContaining("root"));

    const inputElement = renderResult.getByRole("searchbox");
    expect(inputElement).toHaveAttribute("aria-label", "商品を検索");
    expect(inputElement).toHaveAttribute("placeholder", "商品を検索");
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveValue("");

    const buttonElement = renderResult.getByRole("button");
    expect(buttonElement).toHaveAttribute("aria-label", "search");
    expect(buttonElement).toHaveAttribute("type", "submit");
    expect(buttonElement).toBeEnabled();

    expect(renderResult.container.getElementsByTagName("svg")).toBeTruthy();
  });

  it("triggers a submit event", () => {
    const renderResult = render(<SearchBox handler={mockHandler} />);

    const inputElement = renderResult.getByRole("searchbox");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement).toHaveValue("test");
    const buttonElement = renderResult.getByRole("button");
    renderResult.debug();
    fireEvent.click(buttonElement);
    // broken in Vitest
    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toBeCalledWith("test");
  });
});
