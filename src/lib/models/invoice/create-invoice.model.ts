import { CreateProduct } from "../product";

export interface CreateInvoice {
  discount: number;
  itemProducts: CreateProduct[];
  buyer: string;
  paymentCard: string;
  paymentMethod: string;
}
