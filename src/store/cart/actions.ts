import { CreateItemProduct, Product } from "@/lib/models";

export const actions = {
  set({ commit }: any, payload: any) {
    commit("SET", payload);
  },
  addProduct({ commit }: any, product: CreateItemProduct) {
    commit("addProduct", product);
  },
  clean({ commit }: any) {
    commit("clean");
  }
};
