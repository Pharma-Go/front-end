import { SearchResponse } from "@/lib/models";
import { Rest } from "@/lib/rest";

class BffService extends Rest {
  constructor() {
    super("/bff");
  }

  public async search(term: string): Promise<SearchResponse> {
    return this.get({
      url: `/search/${term}`
    });
  }
}

export const bff = Object.freeze(new BffService());
