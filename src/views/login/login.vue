<template>
  <div class="c-login">
    <img
      class="c-login__img"
      :src="require('../../assets/medicina.svg')"
      alt="Login image"
    />

    <div class="c-login__content">
      <h1 class="c-login__title text--center">Acesse sua conta</h1>

      <div class="d-flex flex-col align-end">
        <div class="mt-4 fill-w">
          <pg-input :hideMessages="true" label="Email" />
        </div>

        <div class="mt-2 fill-w">
          <pg-input :hideMessages="true" label="Senha" />
        </div>

        <a class="text--normal text--foregroundTertiary">Esqueceu a senha?</a>

        <div class="d-flex flex-col align-center fill-w">
          <pg-button class="mt-4 fill-w" v-color="'primary'">
            <span class="text--contrast"> Login </span>
          </pg-button>

          <a class="mt-3">
            <span>Novo na Pharma.GO?</span>
            <span class="text--primary text--bold ml-1">Registrar-se</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../lib/styles/mq.scss";
@import "../../lib/styles/typography.scss";

.c-login {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  height: 100%;

  @include mq($until: tablet-landscape) {
    flex-direction: column;
  }

  &__img {
    width: 100%;
    padding: var(--spacing-2);
    flex: 1;
  }

  &__content {
    flex: 1;
    margin-left: calc(var(--spacing-1) * 21);
    width: 100%;

    @include mq($until: tablet-landscape) {
      margin-left: 0;
    }
  }

  &__title {
    @include font-size($global-beta-size);

    @include mq($until: tablet-landscape) {
      @include font-size($global-gamma-size);
      padding-top: var(--spacing-5);
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class PgLogin extends Vue {}
</script>
