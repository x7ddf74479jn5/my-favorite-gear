import axios from "axios";

import type { Gear } from "./models/gear";

interface ApiConfig {
  baseURL?: string;
  timeout?: number;
  keyword?: string;
  elements?: string;
  affiliateId?: string;
  entity?: string;
  hits?: number;
  formValidation?: 1 | 2;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: "https://app.rakuten.co.jp/services/api/Product/Search/20170426",
  timeout: 7000,
  elements: [
    "affiliateUrl",
    "makerName",
    "mediumImageUrl",
    "productId",
    "productName",
  ].join(),
  keyword: "",
  affiliateId: "1ea10fb2.e46bf703.1ea10fb3.49311a3d",
  hits: 20,
  formValidation: 2,
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
      `/?keyword=${encodeURI(config.keyword ? config.keyword : "")}&elements=${
        config.elements
      }&affiliateId=${config.affiliateId}&hits=${config.hits}&entity=${
        config.entity
      }&formValidation=${config.formValidation}`
    );

    if (response.status !== 200) {
      const gears: Gear[] = [];
      return gears;
    }
    const gears: Gear[] = response.data.results;
    return gears;
  };

  return getGears;
};
