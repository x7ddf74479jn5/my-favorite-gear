import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import SearchBox from "@/components/MakeFavoriteList/SearchBox";

import { render } from "../../test-utils";

const mockHandler = vi.fn();

describe("SearchBox", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<SearchBox handler={mockHandler} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const { container, getByRole } = render(
      <SearchBox handler={mockHandler} />
    );

    expect(container.getElementsByTagName("form")[0]).toHaveAttribute(
      "class",
      expect.stringContaining("root")
    );

    const inputElement = getByRole("textbox", {
      name: "商品を検索",
    });

    expect(inputElement).toHaveAttribute("aria-label", "商品を検索");
    expect(inputElement).toHaveAttribute("placeholder", "商品を検索");
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveValue("");

    const buttonElement = getByRole("button");
    expect(buttonElement).toHaveAttribute("aria-label", "search");
    expect(buttonElement).toHaveAttribute("type", "submit");
    expect(buttonElement).toBeEnabled();

    expect(container.getElementsByTagName("svg")).toBeTruthy();
  });

  it("triggers a submit event", async () => {
    const user = userEvent.setup();

    const { getByRole } = render(<SearchBox handler={mockHandler} />);

    const inputElement = getByRole("textbox", {
      name: "商品を検索",
    });

    await user.type(inputElement, "test");
    expect(inputElement).toHaveValue("test");
    const buttonElement = getByRole("button");
    await user.click(buttonElement);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(mockHandler).toBeCalledWith("test");
  });
});
