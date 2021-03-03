<template>
  <div class="c-product-card__items-product" v-if="product">
    <div class="c-product-card__items-product-content">
      <img
        class="c-product-card__items-product-image mr-3"
        :src="
          product.imageUrl ||
            require(`../../../../assets/pill-${
              $pharmago.theme.themes.isDark ? 'dark' : 'light'
            }.svg`)
        "
      />

      <div class="c-product-card__items-product-information">
        <p
          class="c-product-card__items-product-information-name text--foreground"
        >
          {{ product.name }}
        </p>
        <p
          class="c-product-card__items-product-information-price text--bold text--primary"
        >
          R$ {{ format(product.price) }}
        </p>
      </div>
    </div>

    <div class="c-product-card__items-product-icon bg--secondaryBackground">
      <i
        :class="[
          'c-product-card__items-product-icon-content',
          'text--primary',
          'pgi',
          'pgi-' + icon,
          { 'c-product-card__items-product-icon-content--rotate': rotateIcon }
        ]"
      >
      </i>
      <i></i>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-product-card {
  &__items {
    display: flex;
    flex-direction: column;
    margin-top: var(--spacing-3);

    &-product {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: var(--spacing-2) 0;
      border-bottom: 1px solid var(--dark-foregroundSecondary);

      &-image {
        width: var(--spacing-10);
        height: var(--spacing-10);
        border-radius: 100%;
        object-fit: cover;
        border-radius: var(--spacing-1);
      }

      &-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-information {
        display: flex;
        flex-direction: column;

        &-name,
        &-price {
          margin: 0;
        }
      }

      &-icon {
        border-radius: 100%;
        padding: var(--spacing-1) 4px 3px 4px;

        &-content {
          &--rotate {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { formatPrice } from "@/lib/utils/price";
import { Product } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgProductCard extends Vue {
  @Prop() public product!: Product;
  @Prop({ type: String, default: "chevron-left" }) public icon!: string;
  @Prop({ type: Boolean, default: true }) public rotateIcon!: boolean;

  public format(value: number) {
    return formatPrice(value);
  }
}
</script>
