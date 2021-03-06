<template>
  <div class="c-product">
    <img
      class="c-product__image mt-4"
      :src="product.imageUrl || require(`@/assets/pill-${themeMode}.svg`)"
    />

    <h1
      class="c-product__title text--center mt-4 fill-w text--md text--neutralDarkest"
    >
      {{ product.name }}
    </h1>

    <p
      class="c-product__description text--xxs text--neutralDarkestSecondary mt-2 fill-w"
    >
      {{ product.description }}
    </p>

    <div class="fill-w c-product__footer d-flex justify-between">
      <div class="c-product__footer-quantity">
        <p class="text--xxs text--neutralDarkest mb-1">Quantidade</p>
        <div class="c-product__footer-quantity-form d-flex align-center">
          <div
            class="c-product__footer-quantity-form-subtract"
            @click.prevent="decrement"
          >
            -
          </div>
          <input
            v-model="quantity"
            class="c-product__footer-quantity-form-field"
            type="number"
          />
          <div
            @click.prevent="increment"
            class="c-product__footer-quantity-form-add"
          >
            +
          </div>
        </div>
      </div>

      <button
        @click.prevent="onContinue"
        class="fill-w c-product__footer-button bg--backgroundButtonMedium"
      >
        <span class="text--textButtonMedium text--xxs text--bold">
          Continuar
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/depth.scss";

.c-product {
  width: 100%;
  height: 100%;
  padding: var(--spacing-2) var(--spacing-4) var(--spacing-14) var(--spacing-4);
  display: flex;
  flex-direction: column;
  align-items: center;

  &__image {
    width: calc(var(--spacing-16) + var(--spacing-5));
    height: calc(var(--spacing-16) + var(--spacing-5));
  }

  &__description {
    word-break: break-all;

    padding-bottom: var(--spacing-14);
  }

  &__footer {
    box-shadow: var(--theme-shadowLevel1);

    position: fixed;
    padding: var(--spacing-2) var(--spacing-4);
    bottom: 0;
    left: 0;
    right: 0;
    border-top-left-radius: var(--spacing-4);
    border-top-right-radius: var(--spacing-4);
    background: var(--theme-background);

    &-quantity {
      flex: 1;

      > p {
        margin: 0;
      }

      &-form {
        &-subtract,
        &-add {
          background: var(--theme-navigationBarBackground);
          color: #fff;
          width: var(--spacing-4);
          height: var(--spacing-4);

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;
        }

        &-subtract {
          border-top-left-radius: var(--spacing-1);
          border-bottom-left-radius: var(--spacing-1);
        }

        &-add {
          border-top-right-radius: var(--spacing-1);
          border-bottom-right-radius: var(--spacing-1);
        }

        &-field {
          max-width: var(--spacing-14);
          height: var(--spacing-4);
          border: none;
          text-align: center;
          outline: none;
          background: var(--theme-backgroundMedium);
          border-top: 1px solid var(--theme-navigationBarBackground);
          border-bottom: 1px solid var(--theme-navigationBarBackground);
          color: var(--theme-neutralDarkest);

          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
        }
      }
    }

    &-button {
      flex: 1;
      border-radius: 33px;
      border: none;
      cursor: pointer;
      outline: none;
    }
  }
}
</style>

<script lang="ts">
import { CreateItemProduct, Product } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgProductBottomSheet extends Vue {
  get themeMode() {
    return this.$pharmago.theme.themes.isDark ? "dark" : "light";
  }

  @Prop() public product: Product;

  public quantity = 1;

  public increment(): void {
    if (this.quantity >= 99) {
      return;
    }

    this.quantity++;
  }

  public decrement(): void {
    if (this.quantity <= 0) {
      return;
    }

    this.quantity--;
  }

  public onContinue(): void {
    const createProduct: CreateItemProduct = {
      product: this.product,
      quantity: this.quantity
    };

    this.$emit("addProduct", createProduct);
  }
}
</script>
