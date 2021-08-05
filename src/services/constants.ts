export const collectionName = {
  users: "users",
  docCounters: "docCounters",
  favoriteLists: "favoriteLists",
} as const;

export const api = {
  amazon: {
    baseURL:
      "https://www.amazon.co.jp/s?k=ドウシシャ&tag=x7ddf74479jn5-22&language=ja_JP&ref_=as_li_ss_tl",
    affiliateId: "x7ddf74479j04-22",
  },
  rakuten: {
    baseURL: "https://app.rakuten.co.jp/services/api/Product/Search/20170426",
    affiliateId: "1ea10fb2.e46bf703.1ea10fb3.49311a3d",
  },
} as const;
