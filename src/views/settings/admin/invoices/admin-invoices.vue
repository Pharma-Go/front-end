<template>
  <pg-settings
    title="Pedidos"
    :canBack="true"
    backUrl="/configuracoes/"
    class="c-admin-invoices"
  >
    <div class="c-admin-invoices__content" v-if="orders && orders.length > 0">
      <div
        v-for="order in orders"
        :key="order.id"
        class="mb-4 c-admin-invoices__content-order"
      >
        <pg-invoice-card
          class="c-admin-invoices__content-order-item"
          :invoice="order"
          @clickInvoice="onAcceptInvoice"
        >
          <div
            title="Aceitar pedido"
            class="bg--secondaryBackground d-flex align-center justify-center c-admin-invoices__content-order-item-content mr-2"
          >
            <i
              class="text--primary text--large pgi pgi-added c-admin-invoices__content-order-item-content-icon"
            ></i>
          </div>
        </pg-invoice-card>
      </div>
    </div>

    <p class="text--center">Oops! Não há nenhum pedido para entrega</p>
  </pg-settings>
</template>

<style lang="scss">
.c-admin-invoices {
  &__content {
    &-order {
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
import { Invoice } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("invoice", ["orders"])
  }
})
export default class PgAdminInvoices extends Vue {
  public orders!: Invoice[];

  public async created(): Promise<void> {
    if (!this.orders || this.orders?.length === 0) {
      const orders = await this.$api.invoices.availableOrders();
      this.$store.dispatch("invoice/set", { orders });
    }
  }

  public async onAcceptInvoice(invoice: Invoice): Promise<void> {
    await this.$api.invoices.delivererAccept(invoice.id);

    const orders = await this.$api.invoices.availableOrders();
    await this.$store.dispatch("invoice/set", { orders });
  }
}
</script>