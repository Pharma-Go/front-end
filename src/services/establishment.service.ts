import { Rest } from "@/lib/rest";

class EstablishmentService extends Rest {
  constructor() {
    super("/establishment");
  }

  public async mostRated(): Promise<any> {
    return this.getOne("mostRated");
  }
}

export const establishments = Object.freeze(new EstablishmentService());
