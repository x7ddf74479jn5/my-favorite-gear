import axios from "axios";

import { api } from "./constants";
import type { Gear } from "./models/gear";

interface ApiConfig {
  baseURL?: string;
  timeout?: number;
  keyword?: string;
  elements?: string;
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
    "productNo",
    "makerName",
    "brandName",
    "mediumImageUrl",
    "productUrlPC",
    "productCaption",
    "affiliateUrl",
    "releaseDate",
    "averagePrice",
  ].join(),
  keyword: "",
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

  const getGears = async () => {
    const response = await instance.get(
      `?keyword=${encodeURI(config.keyword ? config.keyword : "")}&elements=${
        config.elements
      }&affiliateId=${config.affiliateId}&hits=${config.hits}&formatVersion=${
        config.formatVersion
      }`
    );

    if (response.status !== 200) {
      const gears: Gear[] = [];
      return gears;
    }
    const gears: Gear[] = response.data.Products;
    return gears;
  };

  return getGears;
};
