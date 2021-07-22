import userEvent from "@testing-library/user-event";
import SongCard from "components/common/card/SongCard";
import React from "react";

import { render, testPlaylist, testSong } from "../../../test-utils";

const mockAddButton = jest.fn();
const mockRemoveButton = jest.fn();
const mockUpButton = jest.fn();
const mockDownButton = jest.fn();

describe("SongCard", () => {
  it("matches snapshot", () => {
    let renderResult;

    renderResult = render(
      <SongCard
        song={testSong}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    expect(renderResult.asFragment()).toMatchSnapshot();

    renderResult = render(
      <SongCard
        song={testPlaylist.songs[0]}
        playlist={testPlaylist.songs}
        addButton={mockAddButton}
        removeButton={mockRemoveButton}
        upButton={mockUpButton}
        downButton={mockDownButton}
      />
    );

    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("renders correctly when a user has not registered any song to a playlist yet", () => {
    const renderResult = render(
      <SongCard
        song={testSong}
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
    expect(imgElement).toHaveAttribute("src", expect.stringMatching("src"));
    expect(imgElement).toHaveAttribute(
      "alt",
      expect.stringMatching("trackName")
    );
    expect(
      renderResult.container.getElementsByClassName(
        expect.stringContaining("avatar")
      )
    ).toBeTruthy();

    expect(renderResult.getByText("trackName")).toBeInTheDocument();
    expect(
      renderResult.getByText(
        `${testSong.artistName} - ${testSong.collectionName}`
      )
    ).toBeInTheDocument();

    const buttonElements = renderResult.getAllByRole("button");
    expect(buttonElements).toHaveLength(5);
    expect(buttonElements[4]).toHaveAttribute(
      "href",
      expect.stringMatching(testSong.trackViewUrl)
    );
  });

  it("renders correctly when user's playlist contains same song", () => {
    const renderResult = render(
      <SongCard
        song={testPlaylist.songs[0]}
        playlist={testPlaylist.songs}
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
      <SongCard
        song={testSong}
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
