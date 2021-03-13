import { Product } from ".";

export interface CreateItemProduct {
  product: Product;
  quantity: number;
  prescriptionUrl?: string;
}
