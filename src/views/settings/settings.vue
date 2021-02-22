<template>
  <pg-settings title="Configurações">
    <div class="c-settings__content-header">
      <div class="c-settings__content-header-image"></div>
      <div class="c-settings__content-header-label">
        <p class="c-settings__content-header-label-text text--primary">
          Editar foto
        </p>
        <i
          class="c-settings__content-header-label-icon pgi pgi-edit text--primary"
        ></i>
      </div>
    </div>

    <div class="c-settings__content-personal">
      <h1 class="c-settings__content-personal-title text--foreground">
        Pessoal
      </h1>

      <div
        class="c-settings__content-personal-item"
        @click.prevent="changeTheme"
      >
        <p class="c-settings__content-personal-item-text text--foreground">
          Aparência
        </p>
        <i
          :class="[
            'text--primary',
            'pgi',
            { 'pgi-moon': !$pharmago.theme.themes.isDark },
            { 'pgi-sun': $pharmago.theme.themes.isDark }
          ]"
        ></i>
      </div>
      <div class="c-settings__content-personal-item">
        <p class="c-settings__content-personal-item-text text--foreground">
          Dados
        </p>
        <i
          class="c-settings__content-personal-item-icon text--primary pgi pgi-chevron-left"
        ></i>
      </div>
      <div class="c-settings__content-personal-item">
        <p class="c-settings__content-personal-item-text text--foreground">
          Endereço
        </p>
        <i
          class="c-settings__content-personal-item-icon text--primary pgi pgi-chevron-left"
        ></i>
      </div>
      <div class="c-settings__content-personal-item">
        <p class="c-settings__content-personal-item-text text--foreground">
          Formas de pagamento
        </p>
        <i
          class="c-settings__content-personal-item-icon text--primary pgi pgi-chevron-left"
        ></i>
      </div>
    </div>

    <div class="c-settings__content-admin">
      <h1 class="c-settings__content-admin-title">Administrativo</h1>
      <router-link
        to="configuracoes/admin/estabelecimentos"
        class="c-settings__content-admin-item"
      >
        <p class="c-settings__content-admin-item-text text--foreground">
          Estabelecimentos
        </p>
        <i
          class="c-settings__content-admin-item-icon text--primary pgi pgi-chevron-left"
        ></i>
      </router-link>
    </div>
  </pg-settings>
</template>

<style lang="scss">
@import "../../lib/styles/typography.scss";

.c-settings {
  &__content {
    &-header {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-image {
        width: var(--spacing-9);
        height: var(--spacing-9);
        border-radius: 100%;
        background-color: white;
        margin-bottom: var(--spacing-2);
      }

      &-label {
        display: flex;
        align-items: center;

        &-text {
          margin-bottom: 0;
          margin-right: var(--spacing-2);
        }
      }
    }

    &-personal,
    &-admin {
      margin-top: var(--spacing-4);
      margin-bottom: var(--spacing-6);

      &-title {
        margin-bottom: var(--spacing-3);
      }

      &-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--spacing-3);
        align-items: center;

        &-text {
          margin: 0;
        }

        &-icon {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { Establishment, Product, Review } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";

@Component
export default class PgAdminSettings extends Vue {
  public changeTheme(): void {
    this.$pharmago.theme.themes.isDark = !this.$pharmago.theme.themes.isDark;
  }
}
</script>
