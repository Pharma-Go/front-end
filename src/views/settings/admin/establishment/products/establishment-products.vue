<template>
  <pg-settings title="Produtos">
    <div class="c-establishment-products">
      <div class="c-establishment-products__header">
        <div class="c-establishment-products__header-tabs">
          <p class="c-establishment-products__header-tabs-tab text--bold">
            Lorem Impsum
          </p>
          <p class="c-establishment-products__header-tabs-tab">Lorem Impsum</p>
          <p class="c-establishment-products__header-tabs-tab">Lorem Impsum</p>
          <p class="c-establishment-products__header-tabs-tab">Lorem Impsum</p>
          <p class="c-establishment-products__header-tabs-tab">Lorem Impsum</p>
        </div>
        <div
          class="c-establishment-products__header-icon bg--secondaryBackground"
        >
          <i
            class="c-establishment-products__header-icon-content pgi pgi-add"
          ></i>
        </div>
      </div>

      <div class="c-establishment-products__items">
        <div class="c-establishment-products__items-product">
          <img
            class="c-establishment-products__items-product-image"
            src="https://dummyimage.com/42x42/ffffff/000000"
          />

          <div class="c-establishment-products__items-product-information">
            <p class="c-establishment-products__items-product-information-name">
              Amoxicilina
            </p>
            <p
              class="c-establishment-products__items-product-information-price"
            >
              R$ 15,00
            </p>
          </div>

          <div
            class="c-establishment-products__items-product-icon bg--secondaryBackground"
          >
            <i
              class="c-establishment-products__items-product-icon-content pgi pgi-chevron-left"
            ></i>
          </div>
        </div>
      </div>

      <div class="c-establishment-products__action">
        <i class="c-establishment-products__action-icon pgi pgi-add"></i>
        <p class="c-establishment-products__action-text">Adicionar produto</p>
      </div>
    </div>
  </pg-settings>
</template>

<style lang="scss">
.c-establishment-products {
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    height: var(--spacing-5);
    justify-content: space-between;
    align-items: center;

    &-tabs {
      display: flex;
      height: 100%;
      overflow-x: scroll;
      width: 85%;

      &-tab {
        white-space: nowrap;
        margin: 0 9px;
      }
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      height: 100%;
      width: var(--spacing-5);
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    margin-top: var(--spacing-3);

    &-product {
      display: flex;

      &-information {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgAdminEstablishmentProducts extends Vue {}
</script>
