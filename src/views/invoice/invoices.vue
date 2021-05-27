<template>
  <div v-if="!loadingInvoices">
    <div
      v-if="invoices && invoices.length > 0"
      class="c-content c-home__content-invoices-recents d-flex flex-col align-center pa-4"
    >
      <div class="d-flex align-center c-invoices justify-start">
        <h4
          class="c-home__content-invoices-recents-title d-flex align-center fill-w"
        >
          <i
            @click.prevent="$router.back()"
            class="pgi pgi-chevron-left mr-4 text--primary500 cursor--pointer"
          ></i>
          Meus pedidos
        </h4>
      </div>

      <div class="c-home__content-invoices-recents-content mt-4 fill-w">
        <div
          :class="[
            'c-home__content-invoices-recents-content-card',
            { 'mb-4': index !== invoices.length - 1 }
          ]"
          v-for="(invoice, index) in invoices"
          :key="invoice.id"
        >
          <pg-invoice-card
            v-color="getColorOfInvoice(invoice)"
            :invoice="invoice"
            @clickInvoice="onClickInvoice($event)"
          ></pg-invoice-card>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="c-loading--default mx-auto pa-4">
    <pg-loading class="c-invoices__loading"></pg-loading>
  </div>
</template>

<style lang="scss">
.c-invoices {
  width: 100%;

  &__loading {
    width: 30px;
    height: 30px;
  }
}
</style>

<script lang="ts">
import { Invoice, PaymentStatus } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("invoice", ["invoices"])
  }
})
export default class PgInvoices extends Vue {
  public invoices!: Invoice[];

  public loadingInvoices = false;

  async created() {
    if (!this.invoices || this.invoices?.length === 0) {
      this.loadingInvoices = true;
      const invoices = await this.$api.invoices.get();
      this.$store.dispatch("invoice/set", { invoices });
      console.log(invoices);
      this.loadingInvoices = false;
    }
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

  public async onClickInvoice(invoice: Invoice): Promise<void> {
    const fullInvoice = await this.$api.invoices.getOne(invoice.id);
    await this.$store.dispatch("invoice/set", { active: fullInvoice });
    await this.$router.push(`/pedidos/${invoice.id}`);
  }
}
</script>
