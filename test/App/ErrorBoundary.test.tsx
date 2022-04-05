import React from "react";
import { vi } from "vitest";

import { ErrorBoundary } from "@/ErrorBoundary";

import { render } from "../test-utils";

it("ErrorBoundary can catch errors", () => {
  global.console.error = vi.fn();
  const Bom = () => {
    throw new Error("Bom!");
  };
  const result = render(
    <ErrorBoundary>
      <Bom />
    </ErrorBoundary>
  );
  expect(result.container).toHaveTextContent("Error");
});
