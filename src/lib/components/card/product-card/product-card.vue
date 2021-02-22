<template>
  <div :class="[themeClass, 'c-product-card']" v-if="product">
    <img
      v-if="product.imageUrl"
      class="c-product-card__image"
      :src="product.imageUrl"
      :alt="product.name"
    />

    <div class="c-product-card__content">
      <div class="c-product-card__content-header">
        <p class="text--normal text--bold text--foreground">
          {{ product.name }}
        </p>
        <p
          class="text--normal text--foregroundTertiary"
          v-if="product.category"
        >
          {{ product.category.name }}
        </p>
      </div>
      <p
        class="c-product-card__content-footer text--normal text--bold text--primary"
      >
        R$
        {{ formatPrice(product.price) }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../../styles/depth.scss";

.c-product-card {
  @include z-depth($level: 2, $omni: true);

  display: flex;
  border-radius: var(--spacing-2);
  padding: var(--spacing-2);

  &__image {
    width: var(--spacing-10);
    height: var(--spacing-10);
    margin-right: var(--spacing-4);
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-header {
      > p {
        margin: 0;
      }
    }

    > p {
      margin: 0;
    }
  }
}
</style>

<script lang="ts">
import { Themeable } from "@/lib/mixins";
import { Component, Mixins, Prop } from "vue-property-decorator";
import { Product } from "../../../models";

@Component
export default class PgproductCard extends Mixins(Themeable) {
  @Prop() public product!: Product;

  public formatPrice(value: number) {
    const val = (value / 100).toFixed(2).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
</script>
