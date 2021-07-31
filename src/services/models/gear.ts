export type Gear = {
  productId: string;
  productName: string;
  makerName: string;
  mediumImageUrl: string | null;
  affiliateUrl: string;
};

export const blankGear: Gear = {
  productId: "",
  productName: "",
  makerName: "",
  mediumImageUrl: null,
  affiliateUrl: "",
};
