import { ErrorBoundary } from "@/ErrorBoundary";

import { render } from "../test-utils";

it("ErrorBoundary can catch errors", () => {
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
