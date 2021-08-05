import userEvent from "@testing-library/user-event";
import GearCard from "components/common/card/GearCard";
import React from "react";

import { render, testFavoriteList, testGear } from "../../../test-utils";

const mockAddButton = jest.fn();
const mockRemoveButton = jest.fn();
const mockUpButton = jest.fn();
const mockDownButton = jest.fn();

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
    expect(renderResult.getByText(`${testGear.makerName}`)).toBeInTheDocument();

    const buttonElements = renderResult.getAllByRole("button");
    expect(buttonElements).toHaveLength(5);
    expect(buttonElements[4]).toHaveAttribute(
      "href",
      expect.stringMatching(testGear.affiliateUrl)
    );
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
