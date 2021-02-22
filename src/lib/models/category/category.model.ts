import { Base } from "../base.model";
import { Product } from "../product/product.model";

export interface Category extends Base {
  name: string;
  products: Product[];
}
