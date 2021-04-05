<template>
  <div
    class="c-product-card align-center pa-4"
    v-if="product && product.id"
    @click.prevent="onClickCard"
  >
    <img
      v-if="product.imageUrl"
      class="c-product-card__image mb-2"
      :src="product.imageUrl"
      alt=""
    />
    <img
      v-else
      class="c-product-card__image mb-2"
      :src="
        require(`../../../../assets/pill-${
          $pharmago.theme.themes.isDark ? 'dark' : 'light'
        }.svg`)
      "
      alt=""
    />
    <p
      class="c-product-card__name text--xxs text--neutralDarkest text--bold text--center mb-0"
    >
      {{ product.name }}
    </p>
    <p
      class="c-product-card__category text--xxxs text--neutralMedium text--bold text--center mb-2"
    >
      {{ product.category.name }}
    </p>

    <p
      class="c-product-card__price text-xxxs text--linkMedium text--bold text--center mb-0"
    >
      R$ {{ product.price | formatPrice }}
    </p>
  </div>
</template>

<style lang="scss">
.c-product-card {
  box-shadow: var(--theme-shadowLevel1);
  background: var(--theme-backgroundLight);
  border-radius: var(--spacing-4);
  cursor: pointer;

  &__image {
    width: 78px;
    height: 78px;
    object-fit: cover;
  }
}
</style>

<script lang="ts">
import { Product } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgProductCard extends Vue {
  @Prop() public product!: Product;

  public onClickCard(): void {
    this.$emit("clickCard", this.product);
  }
}
</script>
