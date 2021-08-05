export type Gear = {
  productId: string;
  productName: string;
  makerName: string | null;
  brandName: string | null;
  mediumImageUrl: string | null;
  productUrlPC: string;
  affiliateUrl: string;
  amazonUrl: string;
  averagePrice: string;
  genreName: string;
};

export const blankGear: Gear = {
  productId: "",
  productName: "",
  makerName: null,
  brandName: null,
  mediumImageUrl: null,
  productUrlPC: "",
  affiliateUrl: "",
  amazonUrl: "",
  averagePrice: "",
  genreName: "",
};
