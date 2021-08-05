export const collectionName = {
  users: "users",
  docCounters: "docCounters",
  favoriteLists: "favoriteLists",
} as const;

export const api = {
  amazon: {
    baseURL: "https://www.amazon.co.jp/",
    affiliateId: process.env.AMAZON_AFFILIATE_ID,
  },
  rakuten: {
    baseURL: "https://app.rakuten.co.jp/services/api/Product/Search/20170426",
    affiliateId: process.env.RAKUTEN_AFFILIATE_ID,
    applicationId: process.env.RAKUTEN_APP_ID,
  },
} as const;
