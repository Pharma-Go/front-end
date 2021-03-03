import { Address } from "../address";
import { Base } from "../base.model";
import { Card } from "../card/card.model";
import { Establishment } from "../establishment";
import { Invoice } from "../invoice";
import { Product } from "../product";
import { Review } from "../review";

export interface User extends Base {
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
  favoriteEstablishments: Establishment[];
  favoriteProducts: Product[];
}
