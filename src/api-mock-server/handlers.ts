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
          mediumImageUrl: `mediumImageUrl ${i + 1}`,
          makerName: `makerName ${i + 1}`,
          productId: `productId ${i + 1}`,
          affiliateUrl: `${affiliateId}`,
          productName: `${keyword} ${i + 1}`,
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
