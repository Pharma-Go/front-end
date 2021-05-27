import { Establishment, Product, SearchResponse } from "@/lib/models";
import { Rest } from "@/lib/rest";

class BffService extends Rest {
  constructor() {
    super("/bff");
  }

  public async search(term: string): Promise<SearchResponse> {
    const response: {
      establishments: Establishment[];
      products: Product[];
    } = await this.get({
      url: `/search/${term}`
    });

    return {
      establishments: response.establishments,
      products: response.products.reduce((acc, product) => {
        if (!acc[product.establishment.name]) {
          acc[product.establishment.name] = [product];
        } else {
          acc[product.establishment.name].push(product);
        }

        return acc;
      }, {})
    };
  }
}

export const bff = Object.freeze(new BffService());
