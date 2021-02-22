<template>
  <pg-container
    class="bg--backgroundSettings c-establishments"
    :hasHorizontalPadding="false"
  >
    <div class="c-settings__header">
      <h1 class="c-settings__header-title text--foreground">
        Estabelecimentos
      </h1>

      <div class="c-settings__header-logout">
        <p class="c-settings__header-logout-text text--small text--primary">
          Sair
        </p>
        <i
          class="c-settings__header-logout-icon pgi pgi-logout text--primary"
        ></i>
      </div>
    </div>

    <div class="c-settings__content bg--background"></div>
  </pg-container>
</template>

<style lang="scss"></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgAdminEstablishments extends Vue {}
</script>
