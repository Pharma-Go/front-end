import { Card } from "../card";
import { CreateProduct } from "../product";

export interface Cart {
  total: number;
  products: CreateProduct[];
  payment: Card;
}
