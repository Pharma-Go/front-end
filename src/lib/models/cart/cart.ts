import { Card } from "../card";
import { CreateItemProduct } from "../product";

export interface Cart {
  total: number;
  products: CreateItemProduct[];
  payment: Card;
}
