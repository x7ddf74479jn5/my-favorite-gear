export const collectionName = {
  users: "users",
  docCounters: "docCounters",
  favoriteLists: "favoriteLists",
} as const;

export const api = {
  amazon: {
    baseURL: "https://www.amazon.co.jp/",
    affiliateId: String(import.meta.env.VITE_AMAZON_AFFILIATEID),
  },
  rakuten: {
    baseURL: "https://app.rakuten.co.jp/services/api/Product/Search/20170426",
    affiliateId: String(import.meta.env.VITE_RAKUTEN_AFFILIATEID),
    applicationId: String(import.meta.env.VITE_RAKUTEN_APPID),
  },
} as const;
