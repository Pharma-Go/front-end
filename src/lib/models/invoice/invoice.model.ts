import { Base } from "../base.model";
import { Product } from "../product/product.model";

export interface Invoice extends Base {
  total: number;
  discount: number;
  paymentStatus: any;
  paymentMethod: any;
  paymentDate: Date;
  products: Product[];
}
