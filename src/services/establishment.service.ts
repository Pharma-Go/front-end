import { Establishment } from "@/lib/models";
import { Rest } from "@/lib/rest";

class EstablishmentService extends Rest {
  constructor() {
    super("/establishment");
  }

  public async mostRated(): Promise<Establishment[]> {
    return this.getOne("mostRated");
  }

  public async search(term: string): Promise<Establishment[]> {
    return this.get({
      url: `/search/${term}`
    });
  }
}

export const establishments = Object.freeze(new EstablishmentService());
