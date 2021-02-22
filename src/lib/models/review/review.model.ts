import { Base } from "../base.model";
import { Establishment } from "../establishment";
import { Product } from "../product/product.model";

export interface Review extends Base {
  establishment: Establishment;
  product: Product;
  comment: string;
  stars: number;
}
