import "@testing-library/jest-dom";

import React from "react";
import { describe, expect, it, vi } from "vitest";

import GearCard from "@/components/common/card/GearCard";

import {
  fireEvent,
  render,
  testFavoriteList,
  testGear,
} from "../../../test-utils";

const mockAddButton = vi.fn();
const mockRemoveButton = vi.fn();
const mockUpButton = vi.fn();
const mockDownButton = vi.fn();

describe("GearCard", () => {
  it("matches snapshot", () => {
    let renderResult;

    renderResult = render(
      <GearCard
        gear={testGear}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    expect(renderResult.asFragment()).toMatchSnapshot();

    renderResult = render(
      <GearCard
        gear={testFavoriteList.gears[0]}
        favoriteList={testFavoriteList.gears}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders correctly when a user has not registered any gear to a favoriteList yet", () => {
    const renderResult = render(
      <GearCard
        gear={testGear}
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

    const imgElement = renderResult.getByRole("img");
    expect(imgElement).toHaveAttribute(
      "src",
      expect.stringMatching("mediumImageUrl")
    );
    expect(imgElement).toHaveAttribute(
      "alt",
      expect.stringMatching("productName")
    );

    expect(renderResult.getByText("productName")).toBeInTheDocument();
    expect(
      renderResult.getByText(
        `${testGear.makerName}/${testGear.brandName}/${testGear.genreName}`
      )
    ).toBeInTheDocument();

    const ankerElements = renderResult.getAllByRole("link");
    expect(ankerElements.length).toBe(2);
    expect(ankerElements[0]).toHaveAttribute(
      "href",
      expect.stringMatching(testGear.affiliateUrl)
    );
    expect(ankerElements[1]).toHaveAttribute(
      "href",
      expect.stringMatching(testGear.amazonUrl)
    );

    const buttonElements = renderResult.getAllByRole("button");
    expect(buttonElements).toHaveLength(4);
    expect(buttonElements[2]).toHaveTextContent("My Favorite Gearに登録");
    expect(buttonElements[3]).toHaveTextContent("My Favorite Gearから削除");
  });

  it("renders correctly when user's favoriteList contains same gear", () => {
    const renderResult = render(
      <GearCard
        gear={testFavoriteList.gears[0]}
        favoriteList={testFavoriteList.gears}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    const buttonElements = renderResult.getAllByRole("button");
    expect(buttonElements[2]).toHaveTextContent("My Favorite Gearに登録済み");
    expect(buttonElements[2]).toBeDisabled();
  });

  it("triggers user events", async () => {
    const renderResult = render(
      <GearCard
        gear={testGear}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    const buttonElements = renderResult.getAllByRole("button");
    const upButton = buttonElements[0];
    const downButton = buttonElements[1];
    const addButton = buttonElements[2];
    const removeButton = buttonElements[3];

    fireEvent.click(upButton);
    expect(mockUpButton).toBeCalled();

    fireEvent.click(downButton);
    expect(mockDownButton).toBeCalled();

    fireEvent.click(addButton);
    expect(mockAddButton).toBeCalled();

    fireEvent.click(removeButton);
    expect(mockRemoveButton).toBeCalled();
  });
});
