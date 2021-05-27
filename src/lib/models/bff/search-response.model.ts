import { Establishment } from "../establishment";
import { Product } from "../product";

export interface SearchResponse {
  establishments: Establishment[];
  products: Record<string, Product[]>;
}
