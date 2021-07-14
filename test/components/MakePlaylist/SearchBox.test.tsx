import userEvent from "@testing-library/user-event";
import SearchBox from "components/MakePlaylist/SearchBox";
import React from "react";

import { render } from "../../test-utils";

const mockHandler = jest.fn();

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

    const inputElement = renderResult.getByRole("textbox");
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

    const inputElement = renderResult.getByRole("textbox");
    userEvent.type(inputElement, "test");
    expect(inputElement).toHaveValue("test");

    const buttonElement = renderResult.getByRole("button");
    userEvent.click(buttonElement);
    expect(mockHandler).toBeCalledWith("test");
  });
});
