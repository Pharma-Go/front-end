import { Invoice } from "@/lib/models";
import { Rest } from "@/lib/rest";

class InvoiceService extends Rest {
  constructor() {
    super("/invoices");
  }

  public async recents(): Promise<Invoice[]> {
    return this.getOne("recent");
  }

  public async availableOrders(): Promise<Invoice> {
    return this.getOne("available/orders");
  }

  public async delivererAccept(id: string): Promise<Invoice> {
    return this.request({
      url: `/deliverer/${id}/accept`,
      method: "PUT"
    });
  }

  public async getInvoicesStricteds(): Promise<Invoice[]> {
    return this.request({
      url: `/stricteds/`,
      method: "GET"
    });
  }

  public async updateStrictInvoice(id: string, data: any): Promise<Invoice> {
    return this.request({
      url: `/strict/${id}`,
      method: "PUT",
      data: data
    });
  }

  public async refundInvoice(id: string): Promise<void> {
    return this.request({
      url: `/pagarme/${id}/refund`,
      method: "POST"
    });
  }
}

export const invoices = Object.freeze(new InvoiceService());
