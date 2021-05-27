<template>
  <pg-settings
    v-if="invoice && invoice.id && establishment && establishment.id"
    :title="establishment.name"
    :canBack="true"
    backUrl="/configuracoes/admin/receitas"
    class="c-invoice bg--background pt-5"
  >
    <div class="c-invoice__details">
      <div class="c-invoice__details-item mb-4">
        <p class="mb-0 text--bold text--neutralDarkest text--xxs">
          Pedido: #{{ invoice.id.substring(0, 5) }}
        </p>
        <p class="mb-0 text--neutralDarkestTertiary text--xxxs">
          Pago em: {{ $dayjs(invoice.paymentDate).format("DD/MM/YYYY") }}
        </p>
      </div>
      <div
        class="c-invoice__details-product mt-1"
        v-for="product in invoice.itemProducts"
        :key="product.product.id"
      >
        <p class="mb-1">{{ product.product.name }}</p>
        <div
          v-if="product.prescriptionUrl"
          class="d-flex align-center justify-center"
        >
          <i class="pgi pgi-add text--primary500 text--xs mr-1"></i>
          <a
            :href="product.prescriptionUrl"
            target="_blank"
            class="text--xs text--primary500 text--bold"
          >
            Ver receita médica
          </a>
        </div>
      </div>
      <div class="c-invoice__details-item mt-4">
        <p class="mb-0 text--neutralDarkest text--xxs">Subtotal</p>
        <p class="mb-0 text--neutralDarkestTertiary text--xxs">
          R$ {{ invoice.total | formatPrice }}
        </p>
      </div>
      <div class="c-invoice__details-item mt-1">
        <p class="mb-0 text--neutralDarkest text--xxs">Taxa de entrega</p>
        <p class="mb-0 text--neutralDarkestTertiary text--xxs">
          R$ {{ 500 | formatPrice }}
        </p>
      </div>
      <div class="c-invoice__details-item mt-1">
        <p class="mb-0 text--neutralDarkest text--bold text--xs">Total</p>
        <p class="mb-0 text--neutralDarkest text--bold text--xs">
          R$ {{ (invoice.total + 500) | formatPrice }}
        </p>
      </div>
      <div class="c-invoice__details-payment my-2 py-2">
        <p class="mb-0 text--neutralDarkest text--xxs">
          {{ invoice.paymentCard.method | formatPaymentMethod }}
        </p>
        <p class="mb-0 text--neutralDarkest text--xxs">
          {{ invoice.paymentCard | cardDigits }}
        </p>
      </div>
    </div>

    <div class="d-flex align-center justify-between">
      <pg-button
        class="my-4 fill-w"
        type="submit"
        @click.prevent="updateStrict(false)"
      >
        <span class="text--primary500"> Recusar </span>
      </pg-button>

      <pg-button
        class="my-4 fill-w"
        v-color="'backgroundButtonMedium'"
        type="submit"
        @click.prevent="updateStrict(true)"
      >
        <span class="text--textButtonMedium"> Aceitar </span>
      </pg-button>
    </div>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>
  </pg-settings>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-invoice {
  min-height: 100vh;

  &__details {
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-product {
      padding-bottom: var(--spacing-2);
      border-bottom: 1px solid var(--dark-neutralDark);

      .c-product-card__items-product {
        border: none;
      }

      &-quantity {
        margin: 0;
        width: var(--spacing-4);
        height: var(--spacing-4);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-1);
        border-radius: 100%;
      }
    }

    &-payment {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--dark-neutralDark);
      border-bottom: 1px solid var(--dark-neutralDark);
    }
  }

  &__icon {
    @include font-size($font-size-xl * 1.5);
  }
}
</style>

<script lang="ts">
import { Establishment, Invoice } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgAdminPrescriptionsDetails extends Vue {
  public invoice: Invoice = {} as Invoice;
  public establishment: Establishment = {} as Establishment;

  public snackbar: any = {
    visible: false,
    color: "feedbackErrorMedium"
  };

  public async created(): Promise<void> {
    this.invoice = await this.$api.invoices.getOne(this.$route.params.id);

    const product = await this.$api.products.getOne(
      this.invoice.itemProducts[0].product.id
    );

    const establishment = await this.$api.establishments.getOne(
      product.establishment.id
    );

    this.establishment = establishment;
  }

  public async updateStrict(accept: boolean) {
    await this.$api.invoices.updateStrictInvoice(this.invoice.id, { accept });

    const invoicesStricteds = await this.$api.invoices.getInvoicesStricteds();
    this.$store.dispatch("invoice/set", { invoicesStricteds });
  }
}
</script>
