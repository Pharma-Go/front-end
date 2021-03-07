import { Base } from "../base.model";
import { User } from "../user";
import { ItemProduct } from "./item-product.model";

export enum PaymentStatus {
  paid = "paid",
  pending = "pending",
  refused = "refused"
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD"
}
export interface Invoice extends Base {
  total: number;
  discount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  strictAccepted: boolean;
  delivererAccepted: boolean;
  delivered: boolean;
  buyer: User;
  itemProducts: ItemProduct[];
  deliverer: User;
}
