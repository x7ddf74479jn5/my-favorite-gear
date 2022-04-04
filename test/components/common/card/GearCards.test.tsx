import React from "react";
import { describe, expect, it, vi } from "vitest";

import GearCards from "@/components/common/card/GearCards";

import { render, testFavoriteList } from "../../../test-utils";

const mockAddButton = vi.fn();
const mockRemoveButton = vi.fn();
const mockUpButton = vi.fn();
const mockDownButton = vi.fn();

describe("GearCards", () => {
  it("matches snapshot", () => {
    let renderResult;

    renderResult = render(
      <GearCards
        gears={testFavoriteList.gears}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    expect(renderResult.asFragment()).toMatchSnapshot();

    renderResult = render(
      <GearCards
        gears={testFavoriteList.gears}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders correctly when gears have 8 items ", () => {
    const renderResult = render(
      <GearCards
        gears={testFavoriteList.gears}
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

  it("renders correctly when gears is null", () => {
    const renderResult = render(
      <GearCards
        gears={[]}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

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
      renderResult.getByText("表示できるアイテムがありません。")
    ).toBeInTheDocument();
  });
});
