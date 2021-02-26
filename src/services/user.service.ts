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

  public async changePassword(data: any): Promise<void> {
    await this.request({ url: "/changePassword", data, method: "POST" });
  }

  public async recoverPassword(email: string): Promise<void> {
    await this.request({
      url: "/recoverPassword/" + email,
      method: "GET",
      public: true
    });
  }
}

export const users = Object.freeze(new UserService());
