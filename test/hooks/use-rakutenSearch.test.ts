/**
 * @jest-environment node
 */

import { act, cleanup, renderHook } from "@testing-library/react-hooks";

import useRakutenSearch from "../../src/hooks/use-rakutenSearch";
import { server } from "../api-mock-server/server";

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
    const { result, waitForValueToChange } = renderHook(() => {
      return useRakutenSearch();
    });

    await act(async () => {
      result.current.searchGears("keyword");
      await waitForValueToChange(() => {
        return result.current.gears.length > 0;
      });

      expect(result.current.gears).toHaveLength(20);
      expect(result.current.gears[0]).toEqual(
        expect.objectContaining({
          productName: expect.stringContaining("keyword"),
        })
      );
    });
  });
});
