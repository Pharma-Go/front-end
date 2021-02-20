import { Product } from "../product/product.model";

export interface Category {
  name: string;
  products: Product[];
}
