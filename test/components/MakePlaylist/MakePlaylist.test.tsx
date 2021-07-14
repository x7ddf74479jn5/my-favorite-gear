import MakePlaylist from "components/MakePlaylist";
import React from "react";

import { render } from "../../test-utils";

jest.mock("containers/MakePlaylist/MakePlaylist", () => {
  const MakePlaylistContainer = () => {
    return <div data-testid="MakePlaylistContainer"></div>;
  };
  return MakePlaylistContainer;
});

describe("MakePlaylist", () => {
  it("renders correctly", () => {
    const renderResult = render(<MakePlaylist />);

    expect(renderResult.container.firstElementChild).toHaveAttribute(
      "class",
      expect.stringContaining("root")
    );
    expect(
      renderResult.getByTestId("MakePlaylistContainer")
    ).toBeInTheDocument();

    renderResult.debug();
  });
});
