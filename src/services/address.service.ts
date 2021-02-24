import { Rest } from "@/lib/rest";

class AddressService extends Rest {
  constructor() {
    super("/addresses");
  }
}

export const address = Object.freeze(new AddressService());
