import { CreateItemProduct, Establishment, Product } from "@/lib/models";

export const actions = {
  set({ commit }: any, payload: any) {
    commit("SET", payload);
  },
  addProduct(
    { commit }: any,
    data: { createProduct: CreateItemProduct; establishment: Establishment }
  ) {
    commit("addProduct", data);
  },
  clean({ commit }: any) {
    commit("clean");
  }
};
