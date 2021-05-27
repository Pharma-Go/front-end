<template>
  <div class="c-confirmation px-6" v-if="invoice">
    <div v-if="invoice.strictAccepted">
      <div v-if="invoice.paymentStatus === 'pending'">
        <div
          class="c-confirmation__icon text--center d-flex flex-col align-center"
        >
          <i class="text--feedbackWarningMedium pgi pgi-clock mb-6"></i>
          <p class="text--xs text--center mb-1">
            Seu pedido está sendo processado pela operadora do cartão.
          </p>
          <p class="text--center text--xs text--bold">
            Aguarde alguns instantes!
          </p>
          <div class="c-confirmation__loading">
            <pg-loading></pg-loading>
          </div>
        </div>
      </div>

      <div v-if="invoice.paymentStatus === 'paid'">
        <div
          class="c-confirmation__icon text--center d-flex flex-col align-center"
        >
          <i class="text--feedbackSuccessMedium pgi pgi-confirmed mb-6"></i>
          <p class="text--xs text--center mb-1">Seu pedido foi confirmado!</p>
          <p
            @click.prevent="onGoToInvoice"
            class="cursor--pointer text--xxs text--center text--bold text--primary500"
            v-if="!isLoading"
          >
            Acompanhar o pedido
          </p>
          <div class="c-confirmation__loading" v-else>
            <pg-loading></pg-loading>
          </div>
        </div>
      </div>

      <div v-if="invoice.paymentStatus === 'refused'">
        <div
          class="c-confirmation__icon text--center d-flex flex-col align-center"
        >
          <i class="text--feedbackErrorMedium pgi pgi-close mb-6"></i>
          <p class="text--xs text--center mb-1">Seu pedido foi recusado!</p>
          <p class="text--center text--bold text--primary500">
            Entrar em contato com a farmácia
          </p>
        </div>
      </div>
    </div>
    <div class="c-confirmation__icon text--center" v-else>
      <i class="text--feedbackWarningMedium pgi pgi-clock mb-6"></i>
      <div class="text--center">
        <p class="mb-2 text--xs">
          Seu pedido está <strong>pendente</strong> para a farmácia aceitar sua
          receita médica.
        </p>
        <p class="mb-0 text--bold text--xs">
          Você será notificado quando tiver alguma atualização no seu pedido ;)
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-confirmation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  &__icon {
    @include font-size($font-size-xl * 1.5);
  }

  &__loading {
    width: var(--spacing-4);
    height: var(--spacing-4);
  }
}
</style>

<script lang="ts">
import { Invoice } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgConfirmationBottomSheet extends Vue {
  @Prop() public invoice: Invoice;

  public isLoading = false;

  public async onGoToInvoice() {
    this.isLoading = true;

    const invoice = await this.$api.invoices.getOne(this.invoice.id);
    await this.$store.dispatch("invoice/set", { active: invoice });

    await this.$router.push(`/pedidos/${invoice.id}`);

    this.isLoading = false;
  }
}
</script>
