import { Base } from "../base.model";
import { Category } from "../category";
import { Establishment } from "../establishment";
import { Invoice } from "../invoice";
import { Review } from "../review";

export interface Product extends Base {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  available: boolean;
  imageUrl: string;
  establishment: Establishment;
  category: Category;
  invoices: Invoice[];
  reviews: Review[];
  strict: boolean;
}
