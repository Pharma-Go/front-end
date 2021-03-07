import { Cart, CreateProduct } from "@/lib/models";

export const mutations = {
  SET(state: any, payload: any) {
    Object.assign(state, payload);
  },
  addProduct(state: { cart: Cart }, product: CreateProduct) {
    if (state.cart.products && state.cart.products.length > 0) {
      for (const createProduct of state.cart.products) {
        if (
          createProduct.product.establishment.id !==
          product.product.establishment.id
        ) {
          // Melhorar exception
          throw new Error(
            "Não é possível adicionar produtos de diferentes estabelecimentos"
          );
        }
      }

      const index = state.cart.products.findIndex(
        (createProduct: CreateProduct) =>
          createProduct.product.id === product.product.id
      );

      if (index !== -1) {
        state.cart.products[index].quantity =
          Number(state.cart.products[index].quantity) +
          Number(product.quantity || 1);
      }
    } else {
      state.cart.products = [product];
    }
  },
  clean(state: any) {
    state.cart.products = [];
  }
};
