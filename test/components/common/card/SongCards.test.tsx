import SongCards from "components/common/card/SongCards";
import React from "react";

import { render, testPlaylist } from "../../../test-utils";

const mockAddButton = jest.fn();
const mockRemoveButton = jest.fn();
const mockUpButton = jest.fn();
const mockDownButton = jest.fn();

describe("SongCards", () => {
  it("matches snapshot", () => {
    let renderResult;

    renderResult = render(
      <SongCards
        songs={testPlaylist.songs}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    expect(renderResult.asFragment()).toMatchSnapshot();

    renderResult = render(
      <SongCards
        songs={testPlaylist.songs}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders correctly when songs have 8 items ", () => {
    const renderResult = render(
      <SongCards
        songs={testPlaylist.songs}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    expect(renderResult.container.firstElementChild).toHaveAttribute(
      "class",
      expect.stringContaining("root")
    );
    expect(renderResult.getAllByRole("img")).toHaveLength(8);
  });

  it("renders correctly when songs is null", () => {
    const renderResult = render(
      <SongCards
        songs={[]}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );
    renderResult.debug();

    const rootElement = renderResult.container.firstElementChild;

    expect(rootElement).toHaveAttribute(
      "class",
      expect.stringContaining("root")
    );
    expect(rootElement?.firstElementChild).toHaveAttribute(
      "class",
      expect.stringContaining("bottom")
    );
    expect(
      renderResult.getByText("表示できる曲がありません。")
    ).toBeInTheDocument();
  });
});
