<template>
  <div class="c-home bg--background" v-if="user">
    <pg-container>
      <div class="c-home__header">
        <h1 class="c-home__header-title text--foreground mr-2">
          {{ user.name }}
        </h1>
        <img
          v-if="user.imageUrl"
          class="c-home__header-avatar"
          alt="Avatar"
          :src="user.imageUrl"
        />
        <i v-else class="pgi pgi-user c-home__header-avatar--icon"></i>
      </div>

      <div class="c-home__invoices mt-6">
        <div class="c-home__invoices-header">
          <h2 class="text--foreground">Meus pedidos</h2>
          <router-link to="" class="text--link text--bold"
            >Ver tudo</router-link
          >
        </div>

        <div
          v-if="recents && recents.length > 0"
          class="c-home__invoices-content mt-4 pb-4"
        >
          <div
            class="c-home__invoices-content-card"
            v-for="invoice in recents"
            :key="invoice.id"
            @click.prevent="onClickInvoice(invoice)"
          >
            <pg-invoice-card
              v-color="getColorOfInvoice(invoice)"
              :invoice="invoice"
            ></pg-invoice-card>
          </div>
        </div>

        <div v-else class="mt-3 text--center">
          <p>
            Ops! Não foi feito nenhum pedido ainda!
            <router-link to="" class="text--primary text--bold"
              >Buscar farmácias</router-link
            >
          </p>
        </div>
      </div>

      <div class="c-home__establishments mt-4">
        <div class="c-home__establishments-header">
          <h2 class="text--foreground">Melhores avaliadas</h2>
          <router-link to="" class="text--link text--bold"
            >Ver tudo</router-link
          >
        </div>

        <div
          class="c-home__establishments-content mt-4"
          v-if="mostRateds && mostRateds.length > 0"
        >
          <div
            v-for="establishment in mostRateds"
            :key="establishment.id"
            class="c-home__establishments-content-card"
          >
            <pg-establishment-card
              :establishment="establishment"
              @clickCard="onClickEstablishment(establishment)"
            ></pg-establishment-card>
          </div>
        </div>

        <div v-else class="mt-3 text--center">
          <p>
            Ops! Não foi feito nenhum pedido ainda!
            <router-link to="" class="text--primary text--bold"
              >Buscar farmácias</router-link
            >
          </p>
        </div>
      </div>
    </pg-container>
  </div>
</template>

<style lang="scss" scoped>
@import "../lib/styles/mq.scss";
@import "../lib/styles/typography.scss";

.c-home {
  transition: color, background, background-color 0.3s ease-in-out;
  height: 100vh;

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-avatar {
      width: var(--spacing-9);
      height: var(--spacing-9);
      border-radius: var(--spacing-1);
      object-fit: cover;

      &--icon {
        @include font-size($font-size-lg);

        border: 1px solid var(--theme-primary);
        color: var(--theme-primary);
        border-radius: 100%;
        width: var(--spacing-9);
        height: var(--spacing-9);
        display: flex !important;
        justify-content: center;
        align-items: center;
        padding-bottom: 3px;
      }
    }
  }

  &__establishments,
  &__invoices {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2,
      > p {
        margin: 0;
      }
    }
  }

  &__invoices {
    &-content {
      display: flex;
      overflow-x: scroll;
      padding: var(--spacing-1);

      &::-webkit-scrollbar {
        width: 1px;
        height: 3px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: var(--theme-loadingBackground);
        margin-top: 36px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: var(--theme-primary);
        border-radius: var(--spacing-1);
      }

      &-card {
        margin-right: var(--spacing-2);
        padding-right: var(--spacing-2);
        cursor: pointer;

        .c-invoice-card {
          box-shadow: none !important;
        }
      }
    }
  }

  &__establishments {
    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      &-card {
        margin-bottom: var(--spacing-4);
        width: 100%;
      }
    }
  }
}
</style>

<script lang="ts">
import { invoices } from "@/services";
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import { mapState } from "vuex";
import { Establishment, Invoice, PaymentStatus, User } from "../lib/models";

@Component({
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("invoice", ["recents"]),
    ...mapState("establishment", ["mostRateds"])
  }
})
export default class PgHome extends Vue {
  public mostRateds!: Establishment[];
  public recents!: Invoice[];
  public user!: User;

  async created() {
    if (!this.recents || this.recents?.length === 0) {
      const recents = await this.$api.invoices.recents();
      this.$store.dispatch("invoice/set", { recents });
    }

    if (!this.mostRateds || this.mostRateds?.length === 0) {
      const mostRateds = await this.$api.establishments.mostRated();
      this.$store.dispatch("establishment/set", { mostRateds });
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

    return "pending";
  }

  public async onClickInvoice(invoice: Invoice): Promise<void> {
    await this.$store.dispatch("invoice/set", { active: invoice });
    await this.$router.push(`/pedidos/${invoice.id}`);
  }

  public async onClickEstablishment(
    establishment: Establishment
  ): Promise<Route> {
    await this.$store.dispatch("establishment/set", { establishment });

    return this.$router.replace(`/estabelecimento/${establishment.id}`);
  }
}
</script>
