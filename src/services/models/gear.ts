export type Gear = {
  productId: string;
  productName: string;
  productNo: string;
  makerName: string;
  brandName: string;
  mediumImageUrl: string | null;
  productUrlPC: string;
  productCaption: string;
  affiliateUrl: string;
  releaseDate: string;
  averagePrice: string;
};

export const blankGear: Gear = {
  productId: "",
  productName: "",
  productNo: "",
  makerName: "",
  brandName: "",
  productUrlPC: "",
  mediumImageUrl: null,
  productCaption: "",
  affiliateUrl: "",
  releaseDate: "",
  averagePrice: "",
};
