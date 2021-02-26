import { Base } from "../base.model";
import { User } from "../user";

export interface Card extends Base {
  card_id: string;
  method: any;
  user: User;
}

export interface PagarmeCard {
  object: string;
  id: string;
  date_created: Date;
  date_updated: Date;
  brand: string;
  holder_name: string;
  first_digits: string;
  last_digits: string;
  country: string;
  fingerprint: string;
  expiration_date: string;
  valid: boolean;
}
