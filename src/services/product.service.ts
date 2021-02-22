import { Product } from "@/lib/models";
import { Rest } from "@/lib/rest";

class ProductService extends Rest {
  constructor() {
    super("/products");
  }

  public async featuredProducts(establishmentId: string): Promise<Product[]> {
    return this.get({
      url: `${establishmentId}/highlights`
    });
  }
}

export const products = Object.freeze(new ProductService());
