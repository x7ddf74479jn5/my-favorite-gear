import TweetButton from "components/common/tweet/TweetButton";
import React from "react";

import { render, testFavoriteList } from "../../../test-utils";

jest.mock("react-share", () => {
  const TwitterShareButton = "mock-twitter";
  return { TwitterShareButton };
});

describe("TweetButton", () => {
  it("matches snapshot", () => {
    const renderResult = render(
      <TweetButton favoriteList={testFavoriteList} />
    );

    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const renderResult = render(
      <TweetButton favoriteList={testFavoriteList} />
    );

    expect(renderResult.container.firstChild).toHaveAttribute(
      "class",
      expect.stringContaining("share")
    );

    const buttonElement = renderResult.getAllByRole("button")[0];
    expect(buttonElement).toHaveTextContent("ツイート");
    expect(buttonElement).toBeEnabled();
    expect(renderResult.container.getElementsByTagName("svg")).toBeTruthy();
  });
});
