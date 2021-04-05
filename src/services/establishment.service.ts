import { Establishment } from "@/lib/models";
import { Rest } from "@/lib/rest";

class EstablishmentService extends Rest {
  constructor() {
    super("/establishment");
  }

  public async suggestions(): Promise<Establishment[]> {
    return this.getOne("suggestions");
  }

  public async mostRateds(): Promise<Establishment[]> {
    return this.getOne("mostRateds");
  }

  public async search(term: string): Promise<Establishment[]> {
    return this.get({
      url: `/search/${term}`
    });
  }

  public async getMy(): Promise<Establishment[]> {
    return this.getOne("my");
  }
}

export const establishments = Object.freeze(new EstablishmentService());
