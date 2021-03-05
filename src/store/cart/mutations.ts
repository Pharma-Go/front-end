import { Cart, CreateProduct } from "@/lib/models";

export const mutations = {
  SET(state: any, payload: any) {
    Object.assign(state, payload);
  },
  addProduct(state: { cart: Cart }, product: CreateProduct) {
    if (state.cart.products && state.cart.products.length > 0) {
      const index = state.cart.products.findIndex(
        (createProduct: CreateProduct) =>
          createProduct.product.id === product.product.id
      );

      console.log(index);

      if (index !== -1) {
        state.cart.products[index].quantity =
          state.cart.products[index].quantity + 1;
      }
    } else {
      state.cart.products = [product];
    }
  }
};
