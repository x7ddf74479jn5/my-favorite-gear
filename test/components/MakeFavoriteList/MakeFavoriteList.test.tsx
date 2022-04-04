import React from "react";
import { describe, expect, it, vi } from "vitest";

import MakeFavoriteList from "@/components/MakeFavoriteList";

import { render } from "../../test-utils";

vi.mock("containers/MakeFavoriteList/MakeFavoriteList", () => {
  const MakeFavoriteListContainer = () => {
    return <div data-testid="MakeFavoriteListContainer"></div>;
  };
  return MakeFavoriteListContainer;
});

describe("MakeFavoriteList", () => {
  it("renders correctly", () => {
    const renderResult = render(<MakeFavoriteList />);

    expect(renderResult.container.firstElementChild).toHaveAttribute(
      "class",
      expect.stringContaining("root")
    );
    expect(
      renderResult.getByTestId("MakeFavoriteListContainer")
    ).toBeInTheDocument();
  });
});
