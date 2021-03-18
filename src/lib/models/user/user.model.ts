import { Address } from "../address";
import { Base } from "../base.model";
import { Card } from "../card/card.model";
import { Establishment } from "../establishment";
import { Invoice } from "../invoice";
import { Product } from "../product";
import { Review } from "../review";

export enum Role {
  ADMIN = "admin",
  EMPLOYEE = "employee",
  DEFAULT = "employee"
}

export interface User extends Base {
  name: string;
  email: string;
  cpf: string;
  password: string;
  available: boolean;
  role: Role;
  isDark: boolean;
  phone: string;
  imageUrl: string;
  address: Address;
  invoices: Invoice[];
  deliveries: Invoice[];
  establishments: Establishment[];
  cards: Card[];
  reviews: Review[];
  favoriteEstablishments: Establishment[];
  favoriteProducts: Product[];
}
