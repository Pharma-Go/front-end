import { Cart, CreateItemProduct, Establishment } from "@/lib/models";

export const mutations = {
  SET(state: any, payload: any) {
    Object.assign(state, payload);
  },
  addProduct(
    state: { cart: Cart },
    item: { createProduct: CreateItemProduct; establishment: Establishment }
  ) {
    if (state.cart.products && state.cart.products.length > 0) {
      for (const createProduct of state.cart.products) {
        if (
          createProduct.product.establishment.id !==
          item.createProduct.product.establishment.id
        ) {
          // Melhorar exception
          throw new Error(
            "Não é possível adicionar produtos de diferentes estabelecimentos"
          );
        }
      }

      const index = state.cart.products.findIndex(
        (createProduct: CreateItemProduct) =>
          createProduct.product.id === item.createProduct.product.id
      );

      if (index !== -1) {
        state.cart.products[index].quantity =
          Number(state.cart.products[index].quantity) +
          Number(item.createProduct.quantity || 1);
      }
    } else {
      state.cart.products = [item.createProduct];
    }

    if (!state.cart.establishment) {
      state.cart.establishment = item.establishment;
    }
  },
  clean(state: any) {
    state.cart = {};
  }
};
