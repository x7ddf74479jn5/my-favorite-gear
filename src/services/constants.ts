export const collectionName = {
  users: "users",
  docCounters: "docCounters",
  favoriteLists: "favoriteLists",
} as const;

export const api = {
  amazon: { baseURL: "", affiliateId: "" },
  rakuten: {
    baseURL: "https://app.rakuten.co.jp/services/api/Product/Search/20170426",
    affiliateId: "1ea10fb2.e46bf703.1ea10fb3.49311a3d",
  },
} as const;
