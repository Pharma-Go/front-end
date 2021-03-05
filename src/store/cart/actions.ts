import { CreateProduct, Product } from "@/lib/models";

export const actions = {
  set({ commit }: any, payload: any) {
    commit("SET", payload);
  },
  addProduct({ commit }: any, product: CreateProduct) {
    commit("addProduct", product);
  }
};
