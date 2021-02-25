import { Rest } from "@/lib/rest";

class CategoryService extends Rest {
  constructor() {
    super("/category");
  }
}

export const category = Object.freeze(new CategoryService());
