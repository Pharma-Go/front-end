<template>
  <div class="c-register">
    <div class="c-register__content text--center">
      <div>
        <h1 class="c-register__title text--center">Registrar-se</h1>
      </div>

      <form class="d-flex flex-col align-end" @submit.prevent="onSubmit">
        <div class="mt-4 fill-w">
          <validation-observer>
            <validation-provider
              name="name"
              v-slot="{ errors }"
              rules="required"
            >
              <pg-input
                :hideMessages="true"
                :errors="errors"
                prependIcon="user"
                label="Nome"
                v-model="form.name"
            /></validation-provider>
          </validation-observer>
        </div>

        <div class="mt-2 fill-w">
          <validation-observer>
            <validation-provider
              name="email"
              v-slot="{ errors }"
              rules="required|email"
            >
              <pg-input
                :hideMessages="true"
                :errors="errors"
                prependIcon="email"
                type="email"
                label="Email"
                v-model="form.email"
              />
            </validation-provider>
          </validation-observer>
        </div>

        <div class="mt-2 fill-w">
          <validation-observer>
            <validation-provider
              name="password"
              v-slot="{ errors }"
              rules="required"
            >
              <pg-input
                :hideMessages="true"
                :errors="errors"
                prependIcon="password"
                type="password"
                label="Senha"
                v-model="form.password"
              />
            </validation-provider>
          </validation-observer>
        </div>

        <div class="mt-2 fill-w">
          <validation-observer>
            <validation-provider
              name="phone"
              v-slot="{ errors }"
              rules="required"
            >
              <pg-input
                :hideMessages="true"
                :errors="errors"
                prependIcon="wallet"
                label="Telefone"
                v-model="form.phone"
            /></validation-provider>
          </validation-observer>
        </div>

        <div class="mt-2 fill-w">
          <validation-observer>
            <validation-provider
              name="cpf"
              v-slot="{ errors }"
              rules="required"
            >
              <pg-input
                :hideMessages="true"
                :errors="errors"
                prependIcon="wallet"
                label="CPF"
                v-model="form.cpf"
            /></validation-provider>
          </validation-observer>
        </div>

        <div class="d-flex flex-col align-center fill-w">
          <pg-button class="mt-4 fill-w" v-color="'primary'" type="submit">
            <span class="text--buttonContrast"> Registrar </span>
          </pg-button>
        </div>
      </form>
      <p class="mt-3">
        <span>Já tem uma conta?</span>
        <router-link to="/">
          <span class="text--primary text--bold ml-1">Login</span>
        </router-link>
      </p>
    </div>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>
  </div>
</template>

<style lang="scss">
@import "../../lib/styles/mq.scss";
@import "../../lib/styles/typography.scss";

.c-register {
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
    @include font-size($font-size-lg);

    @include mq($until: tablet-landscape) {
      @include font-size($font-size-md);
      padding-top: var(--spacing-5);
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
@Component
export default class PgRegister extends Vue {
  public form = {
    name: "",
    email: "",
    password: "",
    cpf: "",
    phone: ""
  };

  public snackbar: any = {
    visible: false,
    color: "feedbackErrorMedium"
  };

  public async onSubmit(): Promise<Route> {
    await this.$api.users
      .register({
        name: this.form.name,
        email: this.form.email,
        cpf: this.form.cpf,
        phone: this.form.phone,
        password: this.form.password,
        role: "default"
      })
      .catch(err => {
        this.snackbar = {
          color: "feedbackErrorMedium",
          icon: "pgi-close",
          text:
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Erro desconhecido",
          visible: true
        };

        return Promise.reject(err);
      });

    return this.$router.replace(
      (this.$route.query.redirect as string) || "/home"
    );
  }
}
</script>
