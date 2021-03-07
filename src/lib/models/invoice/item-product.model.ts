import { Base } from "../base.model";
import { Product } from "../product";

export interface ItemProduct extends Base {
  quantity: number;
  price: number;
  product: Product;
}
