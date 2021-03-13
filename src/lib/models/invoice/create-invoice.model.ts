import { CreateItemProduct } from "../product";

export interface CreateInvoice {
  discount: number;
  itemProducts: CreateItemProduct[];
  buyer: string;
  paymentCard: string;
  paymentMethod: string;
  establishment?: string;
}
