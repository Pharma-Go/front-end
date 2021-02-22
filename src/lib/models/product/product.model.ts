import { Base } from "../base.model";
import { Category } from "../category";
import { Invoice } from "../invoice";
import { Review } from "../review";

export interface Product extends Base {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  available: boolean;
  imageUrl: string;
  category: Category;
  invoices: Invoice[];
  reviews: Review[];
}
