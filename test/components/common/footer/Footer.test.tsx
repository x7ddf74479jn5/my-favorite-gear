import Footer from "components/common/footer/Footer";
import React from "react";

import { render } from "../../../test-utils";

describe("Footer", () => {
  it("matches snapshot", () => {
    const renderResult = render(<Footer />);
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const renderResult = render(<Footer />);

    expect(renderResult.getByRole("contentinfo")).toHaveAttribute(
      "class",
      expect.stringContaining("footer")
    );
    expect(renderResult.container).toHaveTextContent("My Favorite Gear");
    const linkElement = renderResult.getByRole("link");
    expect(linkElement).toHaveTextContent("@pandashark6");
    expect(linkElement).toHaveAttribute(
      "href",
      "https://twitter.com/pandashark6"
    );
  });
});
