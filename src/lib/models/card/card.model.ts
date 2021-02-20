import { User } from "@/store/user/user.store";

export interface Card {
  card_id: string;
  method: any;
  user: User;
}
