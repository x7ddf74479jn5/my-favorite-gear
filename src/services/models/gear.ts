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
  reviewAverage: number | null;
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
  reviewAverage: null,
};

export const assertGear: (data: unknown) => asserts data is Gear = (data) => {
  const d = data as Partial<Gear>;
  const validate = () => {
    if (!(typeof d.productId === "string")) {
      return false;
    }
    if (!(typeof d.productName === "string")) {
      return false;
    }
    if (d.makerName) {
      return typeof d.makerName === "string";
    }
    if (d.brandName) {
      return typeof d.brandName === "string";
    }
    if (d.mediumImageUrl) {
      return typeof d.mediumImageUrl === "string";
    }
    if (!(typeof d.productUrlPC === "string")) {
      return false;
    }
    if (!(typeof d.affiliateUrl === "string")) {
      return false;
    }
    if (!(typeof d.amazonUrl === "string")) {
      return false;
    }
    if (!(typeof d.averagePrice === "string")) {
      return false;
    }
    if (!(typeof d.genreName === "string")) {
      return false;
    }
    if (d.reviewAverage) {
      return typeof d.reviewAverage === "number";
    }
  };
  if (!validate()) {
    throw new Error("data is not Gear type");
  }
};
