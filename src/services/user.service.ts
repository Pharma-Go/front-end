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
      url: "/requestRecoverPassword/" + email,
      method: "POST",
      public: true
    });
  }

  public async changeRecoverPassword(
    email: string,
    data: { code: string; password: string }
  ): Promise<void> {
    await this.request({
      url: "/changeRecoverPassword/" + email,
      data,
      method: "POST",
      public: true
    });
  }

  public async addEstablishmentFavorite(id: string): Promise<void> {
    await this.request({
      url: `/establishment/${id}/favorite`,
      method: "POST"
    });
  }

  public async removeEstablishmentFavorite(id: string): Promise<void> {
    await this.deleteOne(null, {
      url: `/establishment/${id}/favorite`,
      method: "DELETE"
    });
  }
}

export const users = Object.freeze(new UserService());
