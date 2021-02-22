import { Base } from "../base.model";
import { Establishment } from "../establishment";

export interface Address extends Base {
  street: string;
  district: string;
  streetNumber: number;
  complement: string;
  city: string;
  state: string;
  zipcode: string;
  reference: string;
  establishment: Establishment;
}
