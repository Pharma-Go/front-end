import { CreateItemProduct } from "../product";

export interface CreateInvoice {
  discount: number;
  itemProducts: CreateItemProduct[];
  paymentCard: string;
  paymentMethod: string;
  deliveryFeeAmount: number;
  establishment?: string;
}
