import { Invoice } from "@/lib/models";

export const state = () => ({
  recents: [] as Invoice[],
  active: {} as Invoice
});
