import { Rest } from "@/lib/rest";

class UserService extends Rest {
  constructor() {
    super("/users");
  }
}

export const users = Object.freeze(new UserService());
