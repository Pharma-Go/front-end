import { Rest } from "@/lib/rest";

class InvoiceService extends Rest {
  constructor() {
    super("/invoices");
  }

  public async recents(): Promise<any> {
    return this.getOne("recent");
  }
}

export const invoices = Object.freeze(new InvoiceService());
