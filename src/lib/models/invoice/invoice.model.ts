import { Product } from "../product/product.model";

export interface Invoice {
  total: number;
  discount: number;
  paymentStatus: any;
  paymentMethod: any;
  paymentDate: Date;
  products: Product[];
}
