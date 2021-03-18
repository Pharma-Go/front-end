import { Card } from "../card";
import { Establishment } from "../establishment";
import { CreateItemProduct } from "../product";

export interface Cart {
  total: number;
  products: CreateItemProduct[];
  payment: Card;
  establishment: Establishment;
}
