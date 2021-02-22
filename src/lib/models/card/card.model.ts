import { Base } from "../base.model";
import { User } from "../user";

export interface Card extends Base {
  card_id: string;
  method: any;
  user: User;
}
