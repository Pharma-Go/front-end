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
        <p class="c-tab-result__header-pharmacy-title text--normal">
          Farmácias
        </p>
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
        <p class="c-tab-result__header-products-title text--normal">Produtos</p>
      </div>
    </div>
    <div class="c-tab-result__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.c-tab-result {
  &__header {
    display: flex;
    justify-content: space-between;

    &-pharmacy,
    &-products {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--theme-foreground);
      width: 100%;
      transition: all 0.3s ease-in-out;

      &-title {
        margin-bottom: 0;
        cursor: pointer;
        padding: var(--spacing-1);
      }

      &--active {
        color: var(--theme-primary);
        border-bottom: 2px solid var(--theme-primary);
        font-weight: bold;
      }
    }

    &-products {
      margin-left: var(--spacing-6);
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
