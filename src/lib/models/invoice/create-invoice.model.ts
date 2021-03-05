import { CreateProduct } from "../product";

export interface CreateInvoice {
  discount: number;
  itemProducts: CreateProduct[];
  buyer: string;
  cardId: string;
  paymentMethod: string;
}
