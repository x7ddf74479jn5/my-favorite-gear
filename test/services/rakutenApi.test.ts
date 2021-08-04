import { cleanup } from "@testing-library/react";
import { server } from "api-mock-server/server";
import { api } from "services/constants";
import { getGearsFactory } from "services/rakutenApi";

describe("getGearsFactory", () => {
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

  test("returns gears when default config", async () => {
    const getGears = getGearsFactory({ keyword: "keyword" });
    const gears = await getGears();
    expect(gears).toHaveLength(20);
    expect(gears[0]).toMatchObject({
      mediumImageUrl: "mediumImageUrl 1",
      makerName: "makerName 1",
      productId: "productId 1",
      affiliateUrl: api.rakuten.affiliateId,
      productName: "keyword 1",
    });
  });

  test("returns gears when hits = 3 ", async () => {
    const getGears = getGearsFactory({ keyword: "keyword", hits: 3 });
    const gears = await getGears();
    expect(gears).toHaveLength(3);
    expect(gears[0]).toMatchObject({
      mediumImageUrl: "mediumImageUrl 1",
      makerName: "makerName 1",
      productId: "productId 1",
      affiliateUrl: api.rakuten.affiliateId,
      productName: "keyword 1",
    });
  });

  test("fails status 400 when invalid request ", async () => {
    const getGears = getGearsFactory({ elements: "" });
    await expect(getGears()).rejects.toThrow();
  });
});
