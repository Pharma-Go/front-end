import { Rest } from "@/lib/rest";

class AddressService extends Rest {
  constructor() {
    super("/addresses");
  }

  public getByCep(cep: string) {
    return this.getOne(cep);
  }
}

export const address = Object.freeze(new AddressService());
