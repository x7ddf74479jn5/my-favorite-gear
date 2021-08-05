import { rest } from "msw";
import { api } from "services/constants";
import type { Gear } from "services/models/gear";

export const handlers = [
  rest.get(api.rakuten.baseURL, (req, res, ctx) => {
    const keyword = req.url.searchParams.get("keyword");
    const elements = req.url.searchParams.get("elements");
    const affiliateId = req.url.searchParams.get("affiliateId");
    const hits = req.url.searchParams.get("hits") || 20;

    if (!elements || !affiliateId) {
      return res(ctx.status(400));
    }

    const createResponseData = () => {
      const products: Gear[] = [];
      for (let i = 0; i < hits; i++) {
        const product: Gear = {
          productId: `productId ${i + 1}`,
          productName: `${keyword} ${i + 1}`,
          makerName: `makerName ${i + 1}`,
          brandName: `brandName ${i + 1}`,
          productUrlPC: `productUrlPC ${i + 1}`,
          mediumImageUrl: `mediumImageUrl ${i + 1}`,
          affiliateUrl: `${affiliateId}`,
          amazonUrl: `https://amazon.com/${keyword}`,
          averagePrice: `averagePrice ${i + 1}`,
          genreName: `genreName ${i + 1}`,
        };
        products.push(product);
      }
      return products;
    };

    return res(
      ctx.status(200),
      ctx.json({
        Products: createResponseData(),
      })
    );
  }),
];
