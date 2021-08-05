import axios from "axios";

import { api } from "./constants";
import type { Gear } from "./models/gear";

interface ApiConfig {
  baseURL?: string;
  timeout?: number;
  keyword?: string;
  elements?: string;
  applicationId?: string;
  affiliateId?: string;
  hits?: number;
  formatVersion?: 1 | 2;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: api.rakuten.baseURL,
  timeout: 7000,
  elements: [
    "productId",
    "productName",
    "makerName",
    "brandName",
    "mediumImageUrl",
    "productUrlPC",
    "affiliateUrl",
    "averagePrice",
    "genreName",
  ].join(),
  keyword: "",
  applicationId: "1012659610415700155",
  // applicationId: api.rakuten.applicationId,
  affiliateId: api.rakuten.affiliateId,
  hits: 20,
  formatVersion: 2,
};

export const getGearsFactory = (optionConfig?: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
  });

  const makeAmazonUrl = () => {
    const url = `${api.amazon.baseURL}s?&keyword=${encodeURI(
      config.keyword ? config.keyword : ""
    )}&tag=${api.amazon.affiliateId}`;

    return url;
  };

  const getGears = async () => {
    const response = await instance.get(
      `?applicationId=${config.applicationId}&keyword=${encodeURI(
        config.keyword ? config.keyword : ""
      )}&elements=${config.elements}&affiliateId=${config.affiliateId}&hits=${
        config.hits
      }&formatVersion=${config.formatVersion}`
    );

    if (response.status !== 200) {
      const gears: Gear[] = [];
      return gears;
    }
    const _gears: Omit<Gear, "amazonUrl">[] = response.data.Products;
    return _gears.map((gear) => {
      return { ...gear, amazonUrl: makeAmazonUrl() };
    });
  };

  return getGears;
};
