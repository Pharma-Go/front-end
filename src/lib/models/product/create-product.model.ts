import { Product } from ".";

export interface CreateProduct {
  product: Product;
  quantity: number;
  prescriptionUrl?: string;
}
