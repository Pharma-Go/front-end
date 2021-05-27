<template>
  <pg-settings
    title="Trocar senha"
    class="c-profile pt-5"
    :canBack="true"
    backUrl="/configuracoes/"
  >
    <form @submit.prevent="onSubmit" class="c-profile__form">
      <div class="c-profile__form-field">
        <pg-input
          label="Senha atual"
          prependIcon="password"
          type="password"
          v-model="form.currentPassword"
        ></pg-input>
      </div>
      <div class="c-profile__form-field my-4">
        <pg-input
          label="Nova senha"
          prependIcon="password"
          type="password"
          v-model="form.newPassword"
        ></pg-input>
      </div>
      <div class="c-profile__form-field my-4">
        <pg-input
          label="Confirme a nova senha"
          prependIcon="password"
          type="password"
          v-model="form.repeatedNewPassword"
        ></pg-input>
      </div>
      <pg-button
        class="mt-4 fill-w"
        v-color="'backgroundSecondaryButton'"
        type="submit"
      >
        <span class="text--buttonContrast"> Salvar </span>
      </pg-button>
    </form>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>
  </pg-settings>
</template>

<script lang="ts">
import { PgUpload } from "@/lib/components";
import { User } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("user", ["user"])
  }
})
export default class PgProfilePassword extends Vue {
  public form = {
    currentPassword: "",
    newPassword: "",
    repeatedNewPassword: ""
  };

  public snackbar: any = {
    visible: false,
    color: "feedbackErrorMedium"
  };
  public user!: User;
  public $refs!: { image: PgUpload };

  public hasToken = false;

  public created() {
    const token = this.$route.query["token"] as string;

    if (token) {
      this.hasToken = true;

      this.$api.oauth.options.storage.save({
        accessToken: token,
        refreshToken: ""
      });
    }

    if (this.user) {
      for (const key of Object.keys(this.form)) {
        this.form[key] = this.user[key];
      }
    }
  }

  public async onSubmit(): Promise<void> {
    await this.$api.users.changePassword(this.form).catch(err => {
      this.snackbar = {
        color: "feedbackErrorMedium",
        icon: "pgi-close",
        text: err.response?.data?.message || "Erro desconhecido",
        visible: true
      };

      return Promise.reject(err);
    });

    this.$router.go(-1);
  }
}
</script>
