<template>
  <div
    :class="[themeClass, 'c-invoice-card']"
    v-if="invoice"
    @click.prevent="onClick"
  >
    <div class="c-invoice-card__content">
      <div class="c-invoice-card__content-date">
        <p class="c-invoice-card__content-date-day text--medium text--bold">
          20
        </p>
        <p
          class="c-invoice-card__content-date-month text--normal text--foreground"
        >
          Mar
        </p>
      </div>

      <div class="c-invoice-card__content-label">
        <p class="c-invoice-card__content-label-caption mb-0">#35b1e</p>
        <p class="c-invoice-card__content-label-title text--bold mb-0">
          Drogasil
        </p>
        <p class="c-invoice-card__content-label-price text--bold mt-1 mb-0">
          R$ 15,00
        </p>
      </div>
    </div>

    <slot name="action">
      <i
        class="pgi pgi-chevron-left rotate--negative-180 text--neutralDarkest"
      ></i>
    </slot>
  </div>
</template>

<style lang="scss">
@import "../../../styles/depth.scss";

.c-invoice-card {
  box-shadow: var(--theme-shadowLevel1);
  padding: var(--spacing-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--spacing-2);
  cursor: pointer;
  background: var(--theme-backgroundMedium);

  &__content {
    display: flex;
    color: var(--theme-neutralDarkest);

    &-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--current-color);
      width: var(--spacing-10);
      height: var(--spacing-10);
      border-radius: var(--spacing-1);
      padding: var(--spacing-1);
      margin-right: var(--spacing-4);

      &-day,
      &-month {
        margin: 0;
      }

      &-day {
        color: var(--current-color);
      }
    }

    &-label {
      display: flex;
      flex-direction: column;

      &-caption {
        text-transform: uppercase;
      }
    }
  }
}
</style>

<script lang="ts">
import { Themeable } from "@/lib/mixins";
import { Component, Mixins, Prop } from "vue-property-decorator";
import { Invoice, ItemProduct } from "../../../models";

@Component
export default class PgInvoiceCard extends Mixins(Themeable) {
  @Prop() public invoice!: Invoice;

  public getInvoicePrice(): number {
    return (
      this.invoice.itemProducts?.reduce(
        (acc: number, itemProduct: ItemProduct) => {
          acc += itemProduct.price;
          return acc;
        },
        0
      ) ?? 0
    );
  }

  public onClick(): void {
    this.$emit("clickInvoice", this.invoice);
  }
}
</script>
