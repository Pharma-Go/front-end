import { oauth } from "@/lib/OAuth";
import { Rest } from "@/lib/rest";

class UserService extends Rest {
  constructor() {
    super("/users");
  }

  public async register(data: any): Promise<any> {
    await this.save(data, { public: true });
    return oauth.login(data.email, data.password);
  }
}

export const users = Object.freeze(new UserService());
