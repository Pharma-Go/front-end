<template>
  <div :class="[themeClass, 'c-invoice-card']" v-if="invoice">
    <i class="c-invoice-card__icon pgi pgi-invoice" alt="Ícone do produto"></i>

    <div class="c-invoice-card__content">
      <div class="c-invoice-card__content-header">
        <p class="text--normal text--bold text--foreground">
          #{{ invoice.id.substring(0, 5) }}
        </p>
        <p class="text--normal text--foregroundTertiary">
          {{ $dayjs(invoice.created_at).format("DD/MM/YYYY") }}
        </p>
      </div>
      <p
        class="c-invoice-card__content-footer text--normal text--bold text--primary"
      >
        R$
        {{ formatPrice(getInvoicePrice()) }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../../styles/depth.scss";

.c-invoice-card {
  @include z-depth($level: 2, $omni: true);

  display: flex;
  border-radius: var(--spacing-2);
  padding: var(--spacing-2);

  &__icon {
    font-size: var(--spacing-10);
    margin-right: var(--spacing-4);
    padding-top: 9px;
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
import { Invoice } from "../../../models";

@Component
export default class PginvoiceCard extends Mixins(Themeable) {
  @Prop() public invoice!: Invoice;

  public formatPrice(value: number) {
    const val = (value / 100).toFixed(2).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  public getInvoicePrice(): number {
    return (
      this.invoice.products?.reduce((acc: number, product: any) => {
        acc += product.originalPrice;
        return acc;
      }, 0) ?? 0
    );
  }
}
</script>
