<template>
  <div class="c-login">
    <form @submit.prevent="onSubmit" class="c-login__content text--center">
      <h1 class="text--md c-login__title text--center text--neutralDarkest">
        Acesse sua conta
      </h1>

      <div class="d-flex flex-col align-end">
        <div class="mt-4 fill-w">
          <validation-observer>
            <validation-provider
              name="email"
              v-slot="{ errors }"
              rules="required|email"
            >
              <pg-input
                :hideMessages="false"
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
                :errors="errors"
                prependIcon="password"
                type="password"
                label="Senha"
                v-model="form.password"
              />
            </validation-provider>
          </validation-observer>
        </div>

        <p
          class="c-login__forgot-password text--xxs text--neutralDarkest"
          @click.prevent="forgotPassword"
        >
          Esqueceu a senha?
        </p>

        <div class="d-flex flex-col align-center fill-w">
          <pg-button class="mt-4 fill-w" v-color="'primary500'" type="submit">
            <span class="c-login__action-text"> Login </span>
          </pg-button>
        </div>
      </div>
      <p class="mt-3">
        <span class="text--neutralDarkest">Novo na Pharma.GO?</span>
        <router-link to="/cadastro">
          <span class="text--linkMedium text--bold ml-1">Registrar-se</span>
        </router-link>
      </p>
    </form>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>
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
  height: 100vh;

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
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
    font-size: $font-size-lg;

    @include mq($until: tablet-landscape) {
      @include font-size($font-size-md);
      padding-top: var(--spacing-5);
    }
  }

  &__action {
    &-text {
      color: #fff;
    }
  }

  &__forgot-password {
    cursor: pointer;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
@Component
export default class PgLogin extends Vue {
  public form = {
    email: "",
    password: ""
  };

  public snackbar: any = {
    visible: false,
    color: "feedbackErrorMedium"
  };

  public async forgotPassword() {
    if (!this.form.email) {
      this.snackbar = {
        color: "feedbackErrorMedium",
        icon: "pgi-close",
        text: "Digite um email para recuperar a senha",
        visible: true
      };
      return;
    }

    await this.$api.users.recoverPassword(this.form.email).catch(err => {
      this.snackbar = {
        color: "feedbackErrorMedium",
        icon: "pgi-close",
        text: err.response?.data?.message || "Erro desconhecido",
        visible: true
      };

      return Promise.reject(err);
    });

    this.snackbar = {
      color: "feedbackSuccessMedium",
      icon: "pgi-added",
      text: "Verifique seu email para recuperar a senha.",
      visible: true
    };
  }

  public async onSubmit(): Promise<Route> {
    await this.$api.oauth
      .login(this.form.email, this.form.password)
      .catch(err => {
        this.snackbar = {
          color: "feedbackErrorMedium",
          icon: "pgi-close",
          text: err.response?.data?.error || "Erro desconhecido",
          visible: true
        };

        return Promise.reject(err);
      });

    const user = await this.$api.users.getOne("me");

    this.$store.dispatch("user/set", { user });

    return this.$router.replace(
      (this.$route.query.redirect as string) || "/home"
    );
  }
}
</script>
