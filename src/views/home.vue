<template>
  <div class="c-home bg--background" v-if="user">
    <pg-container>
      <div class="c-home__header">
        <h1 class="c-home__header-title text--foreground">
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
          v-if="invoices && invoices.length > 0"
          class="c-home__invoices-content mt-4 pb-4"
        >
          <div
            class="c-home__invoices-content-card"
            v-for="invoice in invoices"
            :key="invoice.id"
          >
            <pg-invoice-card :invoice="invoice"></pg-invoice-card>
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
          v-if="establishments && establishments.length > 0"
        >
          <div
            v-for="establishment in establishments"
            :key="establishment.id"
            class="c-home__establishments-content-card"
          >
            <pg-establishment-card
              :establishment="establishment"
              :route="`estabelecimento/${establishment.id}`"
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

<style lang="scss">
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
        @include font-size($font-lg);

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

      &-card {
        margin-right: var(--spacing-2);
        padding-right: var(--spacing-2);
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
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import { mapGetters, mapState } from "vuex";
import { Establishment, Invoice, User } from "../lib/models";

@Component({
  computed: {
    ...mapState("user", { user: "user" }),
    ...mapState("invoice", { invoices: "recents" }),
    ...mapState("establishment", { establishments: "mostRateds" })
  }
})
export default class PgHome extends Vue {
  public establishments!: Establishment[];
  public invoices!: Invoice[];
  public user!: User;

  async created() {
    if (!this.invoices || this.invoices?.length === 0) {
      const invoices = await this.$api.invoices.recents();
      this.$store.dispatch("invoice/set", { invoices });
    }

    if (!this.establishments || this.establishments?.length === 0) {
      const establishments = await this.$api.establishments.mostRated();
      this.$store.dispatch("establishment/set", { establishments });
    }
  }

  public onClickEstablishment(establishment: Establishment): Promise<Route> {
    this.$store.dispatch("establishment/set", { establishment });

    return this.$router.replace(`/estabelecimento/${establishment.id}`);
  }
}
</script>
