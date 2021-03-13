<template>
  <div class="c-recover-password pa-4">
    <div class="c-recover-password__image"></div>

    <form class="mt-5" @submit.prevent="onSubmit">
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

      <div class="d-flex flex-col align-center fill-w">
        <pg-button class="mt-4 fill-w" v-color="'primary'" type="submit">
          <span class="text--buttonContrast"> Alterar senha </span>
        </pg-button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.c-recover-password {
  &__image {
    width: 100%;
    height: 380px;
    background: var(--theme-primary);
    border-radius: var(--spacing-1);
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
