import { Address } from "../address";
import { Card } from "../card/card.model";
import { Invoice } from "../invoice";
import { Review } from "../review";

export interface User {
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: any;
  phone: string;
  imageUrl: string;
  address: Address;
  invoices: Invoice[];
  cards: Card[];
  reviews: Review[];
}
