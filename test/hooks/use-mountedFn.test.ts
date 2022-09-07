import { renderHook } from "@testing-library/react";

import { useMountedFn } from "@/hooks/use-mountedFn";

it("cb called only once after mounted", () => {
  const mockFn = vi.fn();
  renderHook(() => {
    return useMountedFn(mockFn);
  });
  expect(mockFn.mock.calls.length).toBe(1);
});
