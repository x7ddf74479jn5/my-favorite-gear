import "@testing-library/jest-dom"; // jestのアサーションがエラーになる場合は明示的にimport

import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import GearCard from "@/components/common/card/GearCard";

import { render, testFavoriteList, testGear } from "../../../test-utils";

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
    expect(
      renderResult.container.getElementsByClassName(
        expect.stringContaining("avatar")
      )
    ).toBeTruthy();

    expect(renderResult.getByText("productName")).toBeInTheDocument();
    expect(
      renderResult.getByText(
        `${testGear.makerName}/${testGear.brandName}/${testGear.genreName}`
      )
    ).toBeInTheDocument();

    const buttonElements = renderResult.getAllByRole("button");
    expect(buttonElements).toHaveLength(6);
    expect(buttonElements[0]).toHaveAttribute(
      "href",
      expect.stringMatching(testGear.affiliateUrl)
    );
    expect(buttonElements[1]).toHaveAttribute(
      "href",
      expect.stringMatching(testGear.amazonUrl)
    );
    expect(buttonElements[4]).toHaveTextContent("My Favorite Gearに登録");
    expect(buttonElements[5]).toHaveTextContent("My Favorite Gearから削除");
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
    expect(buttonElements[4]).toHaveTextContent("My Favorite Gearに登録済み");
    expect(buttonElements[4]).toBeDisabled();
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
    const upButton = buttonElements[2];
    const downButton = buttonElements[3];
    const addButton = buttonElements[4];
    const removeButton = buttonElements[5];

    userEvent.click(upButton);
    expect(mockUpButton).toBeCalled();

    userEvent.click(downButton);
    expect(mockDownButton).toBeCalled();

    userEvent.click(addButton);
    expect(mockAddButton).toBeCalled();

    userEvent.click(removeButton);
    expect(mockRemoveButton).toBeCalled();
  });
});
