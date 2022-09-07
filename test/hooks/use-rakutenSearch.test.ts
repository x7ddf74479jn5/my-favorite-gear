import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { server } from "@/api-mock-server/server";
import useRakutenSearch from "@/hooks/use-rakutenSearch";

describe("useRakutenSearch", () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    cleanup();
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  it("should render correctly on a first render", () => {
    const { current } = renderHook(() => {
      return useRakutenSearch();
    }).result;

    expect(current.gears).toHaveLength(0);
    expect(current.loading).toBeFalsy();
    expect(current.searchGears).toBeDefined();
  });

  it("should return empty array when provided a blank keyword", () => {
    const { result } = renderHook(() => {
      return useRakutenSearch();
    });

    act(() => {
      result.current.searchGears("");
      expect(result.current.gears).toHaveLength(0);
    });
  });

  it("should return gears when provided non-blank keyword", async () => {
    const { result } = renderHook(() => {
      return useRakutenSearch();
    });

    act(async () => {
      result.current.searchGears("keyword");
      await waitFor(() => {
        expect(result.current.gears).toHaveLength(20);
        expect(result.current.gears[0]).toEqual(
          expect.objectContaining({
            productName: expect.stringContaining("keyword"),
          })
        );
      });
    });
  });
});
