import { Establishment } from "../establishment";
import { Product } from "../product/product.model";

export interface Review {
  establishment: Establishment;
  product: Product;
  comment: string;
  stars: number;
}
