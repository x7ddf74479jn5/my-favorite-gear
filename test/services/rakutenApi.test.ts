import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";

import { server } from "@/api-mock-server/server";
import { getGearsFactory } from "@/services/rakutenApi";

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
      productId: "productId 1",
      productName: "keyword 1",
      makerName: "makerName 1",
      brandName: "brandName 1",
      productUrlPC: "productUrlPC 1",
      mediumImageUrl: "mediumImageUrl 1",
      affiliateUrl: expect.stringContaining("rakuten"),
      amazonUrl: expect.stringContaining("amazon"),
      averagePrice: `averagePrice 1`,
      genreName: `genreName 1`,
      reviewAverage: 1,
    });
  });

  test("returns gears when hits = 3 ", async () => {
    const getGears = getGearsFactory({ keyword: "keyword", hits: 3 });
    const gears = await getGears();
    expect(gears).toHaveLength(3);
    expect(gears[0]).toMatchObject({
      productId: "productId 1",
      productName: "keyword 1",
      makerName: "makerName 1",
      brandName: "brandName 1",
      productUrlPC: "productUrlPC 1",
      mediumImageUrl: "mediumImageUrl 1",
      affiliateUrl: expect.stringContaining("rakuten"),
      amazonUrl: expect.stringContaining("amazon"),
      averagePrice: `averagePrice 1`,
      genreName: `genreName 1`,
      reviewAverage: 1,
    });
  });

  test("fails status 400 when invalid request ", async () => {
    const getGears = getGearsFactory({ elements: "" });
    await expect(getGears()).rejects.toThrow();
  });
});
