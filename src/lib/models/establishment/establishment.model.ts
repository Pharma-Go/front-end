import { Address } from "../address";
import { Product } from "../product/product.model";
import { Review } from "../review";

export interface Establishment {
  name: string;
  phone: string;
  imageUrl: string;
  opensAt: string;
  closesAt: string;
  products: Product[];
  reviews: Review[];
  address: Address;
}
