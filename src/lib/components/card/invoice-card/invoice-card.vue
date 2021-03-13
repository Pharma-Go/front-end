<template>
  <div
    :class="[themeClass, 'c-invoice-card']"
    v-if="invoice"
    @click.prevent="onClick"
  >
    <div class="d-flex align-center">
      <i
        class="c-invoice-card__icon pgi pgi-invoice"
        alt="Ícone do produto"
      ></i>

      <div class="c-invoice-card__content">
        <div class="c-invoice-card__content-header">
          <p class="text--normal text--bold text--foreground">
            #{{ invoice.id.substring(0, 5) }}
          </p>
          <p class="text--normal text--foregroundTertiary">
            {{ $dayjs(invoice.created_at).format("DD/MM/YYYY") }}
          </p>
        </div>
        <p class="c-invoice-card__content-footer text--normal text--bold">
          R$
          {{ getInvoicePrice() | formatPrice }}
        </p>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<style lang="scss">
@import "../../../styles/depth.scss";

.c-invoice-card {
  @include z-depth($level: 2, $omni: true);

  display: flex;
  border-radius: var(--spacing-2);
  padding: var(--spacing-2);
  border: 1px solid var(--current-color);
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &__icon {
    font-size: var(--spacing-10);
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
      color: var(--current-color);
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
