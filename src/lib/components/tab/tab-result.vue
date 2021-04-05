<template>
  <div class="c-tab-result">
    <div class="c-tab-result__header">
      <div
        :class="[
          'c-tab-result__header-pharmacy',
          {
            'c-tab-result__header-pharmacy--active':
              activeCategory === 'pharmacies'
          }
        ]"
        @click.prevent="changeCategory('pharmacies')"
      >
        <p class="c-tab-result__header-pharmacy-title">Farmácias</p>
      </div>
      <div
        :class="[
          'c-tab-result__header-products',
          {
            'c-tab-result__header-products--active':
              activeCategory === 'products'
          }
        ]"
        @click.prevent="changeCategory('products')"
      >
        <p class="c-tab-result__header-products-title">Produtos</p>
      </div>
    </div>
    <div class="c-tab-result__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-tab-result {
  &__header {
    display: flex;
    justify-content: space-between;

    &-pharmacy,
    &-products {
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--theme-neutralDarkest);
      width: 100%;
      transition: all 0.3s ease-in-out;
      border-bottom: 1px solid var(--theme-neutralDarkest);
      margin-bottom: 2px;

      &-title {
        margin-bottom: 0;
        padding: var(--spacing-1);
        font-size: $font-size-xs;
      }

      &--active {
        color: var(--theme-primary500);
        border-bottom: 4px solid var(--theme-primary500);
        font-weight: bold;
        margin-bottom: 0;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgTabResult extends Vue {
  @Prop({ type: String, default: "pharmacies" }) public activeCategory: string;

  public changeCategory(category: string): void {
    this.$emit("changeCategory", category);
  }
}
</script>
