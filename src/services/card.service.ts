import { Rest } from "@/lib/rest";

class CardsService extends Rest {
  constructor() {
    super("/cards");
  }
}

export const cards = Object.freeze(new CardsService());
