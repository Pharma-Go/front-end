<template>
  <pg-settings
    title="Receitas"
    :canBack="true"
    backUrl="/configuracoes/"
    class="c-prescriptions pt-5"
  >
    <div
      class="c-prescriptions__content"
      v-if="invoicesStricteds && invoicesStricteds.length > 0"
    >
      <div
        v-for="invoice in invoicesStricteds"
        :key="invoice.id"
        class="mb-4 c-prescriptions__content-invoice"
      >
        <pg-invoice-card
          class="c-prescriptions__content-invoice-item"
          :invoice="invoice"
          v-color="getColorOfInvoice(invoice)"
          @clickInvoice="onClickInvoice"
        >
          <div
            title="Aceitar pedido"
            class="bg--secondaryBackground d-flex align-center justify-center c-prescriptions__content-invoice-item-content mr-2"
          >
            <i
              class="text--primary500 text--sm pgi pgi-chevron-left rotate--negative-180 c-prescriptions__content-invoice-item-content-icon"
            ></i>
          </div>
        </pg-invoice-card>
      </div>
    </div>
  </pg-settings>
</template>

<style lang="scss">
.c-prescriptions {
  &__content {
    &-invoice {
      &-item {
        &-content {
          width: var(--spacing-6);
          height: var(--spacing-6);
          border-radius: 100%;
        }
      }
    }
  }
}
</style>
<script lang="ts">
import { Invoice, PaymentStatus } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("invoice", ["invoicesStricteds"])
  }
})
export default class PgAdminPrescriptions extends Vue {
  public invoicesStricteds!: Invoice[];

  public async created(): Promise<void> {
    if (!this.invoicesStricteds || this.invoicesStricteds?.length === 0) {
      const invoicesStricteds = await this.$api.invoices.getInvoicesStricteds();
      console.log(invoicesStricteds);
      this.$store.dispatch("invoice/set", { invoicesStricteds });
    }
  }

  public onClickInvoice(invoice: Invoice) {
    this.$router.push(`/configuracoes/admin/receitas/${invoice.id}`);
  }

  public getColorOfInvoice(invoice: Invoice): string {
    if (invoice.paymentStatus === PaymentStatus.refused || invoice.isFee) {
      return "feedbackErrorMedium";
    }

    if (invoice.strictAccepted) {
      if (invoice.delivered) {
        return "feedbackSuccessMedium";
      } else {
        return "feedbackWarningMedium";
      }
    }

    return "feedbackWarningMedium";
  }
}
</script>
