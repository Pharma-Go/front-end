<template>
  <div class="c-product">
    <img
      class="c-product__image mt-4"
      :src="
        product.imageUrl ||
        require(`@/assets/pill-${
          $pharmago.theme.themes.isDark ? 'dark' : 'light'
        }.svg`)
      "
    />

    <h1 class="c-product__title text--center mt-4 fill-w">
      {{ product.name }}
    </h1>

    <p
      class="c-product__description text--normal text--foregroundSecondary mt-2 fill-w"
    >
      {{ product.description }}
    </p>

    <div class="fill-w c-product__footer d-flex justify-between">
      <div class="c-product__footer-quantity">
        <p class="text--normal text--foreground">Quantidade</p>
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
        class="fill-w c-product__footer-button bg--backgroundButton"
      >
        <span class="text--buttonContrast text--normal text--bold">
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
  }

  &__footer {
    @include z-depth($level: 1, $omni: true);

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
          background: var(--theme-primary);
          color: var(--theme-contrast);
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
import { CreateProduct, Product } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgProductBottomSheet extends Vue {
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
    const createProduct: CreateProduct = {
      product: this.product,
      quantity: this.quantity
    };

    this.$emit("addProduct", createProduct);
  }
}
</script>
