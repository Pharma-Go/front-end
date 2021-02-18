<template>
  <div class="c-login">
    <form @submit="onSubmit" class="c-login__content text--center">
      <h1 class="c-login__title text--center">Acesse sua conta</h1>

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

        <a class="text--normal text--foregroundTertiary">Esqueceu a senha?</a>

        <div class="d-flex flex-col align-center fill-w">
          <pg-button class="mt-4 fill-w" v-color="'primary'" type="submit">
            <span class="text--contrast"> Login </span>
          </pg-button>
        </div>
      </div>
      <p class="mt-3">
        <span>Novo na Pharma.GO?</span>
        <router-link to="/cadastro">
          <span class="text--primary text--bold ml-1">Registrar-se</span>
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
export default class PgLogin extends Vue {
  public form = {
    email: "",
    password: ""
  };

  public snackbar: any = {
    visible: false,
    color: "error"
  };

  public async onSubmit(): Promise<void> {
    await this.$api.oauth
      .login(this.form.email, this.form.password)
      .catch(err => {
        this.snackbar.color = "error";
        this.snackbar.icon = "pgi-add";
        this.snackbar.text = err.response?.data?.error || "Erro desconhecido";
        this.snackbar.visible = true;

        return Promise.reject(err);
      });

    this.$router.push({ name: "Home" });
  }
}
</script>