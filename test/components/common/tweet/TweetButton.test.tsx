import TweetButton from "components/common/tweet/TweetButton";
import React from "react";

import { render } from "../../../test-utils";

const testData = {
  id: "",
  twitterId: "",
  image: null,
  songs: [],
  songsCount: 0,
  updatedAt: null,
};

describe("TweetButton", () => {
  it("matches snapshot", () => {
    const renderResult = render(<TweetButton playlist={testData} />);

    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const renderResult = render(<TweetButton playlist={testData} />);

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
