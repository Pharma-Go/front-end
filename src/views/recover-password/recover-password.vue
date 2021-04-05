<template>
  <div class="c-recover-password pa-4">
    <img
      class="c-recover-password__image"
      src="../../assets/forgot-password.svg"
    />

    <form class="c-recover-password__form mt-5" @submit.prevent="onSubmit">
      <h1 class="text--md mb-4 text--center">Recuperar senha</h1>

      <pg-input
        label="Código"
        prependIcon="user"
        v-model="form.code"
        v-mask="'######'"
      ></pg-input>
      <pg-input
        label="Email"
        prependIcon="email"
        v-model="form.email"
      ></pg-input>
      <pg-input
        label="Senha"
        class="my-3"
        prependIcon="password"
        v-model="form.password"
        type="password"
      ></pg-input>

      <div
        class="c-recover-password__action d-flex flex-col align-center fill-w"
      >
        <pg-button
          class="c-recover-password__action-button mt-4 fill-w"
          v-color="'primary500'"
          type="submit"
        >
          <span class="c-recover-password__action-button-text">
            Alterar senha
          </span>
        </pg-button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/mq.scss";

.c-recover-password {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background: var(--theme-backgroundMedium);

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
    flex-direction: column;
  }

  &__image {
    width: 100%;
    height: 380px;
    background: var(--theme-primary);
    border-radius: var(--spacing-1);
    flex: 1;
    margin-right: var(--spacing-10);
  }

  &__form {
    flex: 1;
  }

  &__action {
    &-button {
      &-text {
        color: #fff;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgRecoverPassword extends Vue {
  public form = {
    code: "",
    email: "",
    password: ""
  };

  public async onSubmit(): Promise<void> {
    await this.$api.users.changeRecoverPassword(this.form.email, {
      code: this.form.code,
      password: this.form.password
    });

    await this.$api.oauth
      .login(this.form.email, this.form.password)
      .catch(err => {
        // this.snackbar = {
        //   color: "error",
        //   icon: "pgi-close",
        //   text: err.response?.data?.error || "Erro desconhecido",
        //   visible: true
        // };
        // return Promise.reject(err);
      });

    const user = await this.$api.users.getOne("me");

    this.$store.dispatch("user/set", { user });

    await this.$router.replace(
      (this.$route.query.redirect as string) || "/home"
    );
  }
}
</script>
