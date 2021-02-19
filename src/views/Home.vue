<template>
  <div class="c-home bg--background">
    <pg-container>
      <div class="c-home__header">
        <h1 class="c-home__header-title text--foreground">
          Vinícius Sousa dos Santos
        </h1>
        <img
          class="c-home__header-avatar"
          alt="Avatar"
          src="../assets/logo.png"
        />
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

        <div class="c-home__establishments-content mt-4">
          <div class="c-home__establishments-content-card">
            <pg-establishment-card></pg-establishment-card>
          </div>
          <div class="c-home__establishments-content-card">
            <pg-establishment-card></pg-establishment-card>
          </div>
        </div>
      </div>

      <input type="checkbox" v-model="$pharmago.theme.themes.isDark" />
    </pg-container>
  </div>
</template>

<style lang="scss">
@import "../lib/styles/mq.scss";

.c-home {
  transition: color, background, background-color 0.3s ease-in-out;
  height: 100vh;

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
  }

  &__header {
    display: flex;

    &-avatar {
      width: var(--spacing-9);
      height: var(--spacing-9);
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
@Component
export default class PgHome extends Vue {
  public invoices: any[] = [];

  async created() {
    this.invoices = await this.$api.invoices.recents();
  }
}
</script>
