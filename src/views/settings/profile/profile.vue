<template>
  <pg-settings
    title="Perfil"
    class="c-profile"
    :canBack="true"
    backUrl="/configuracoes/"
  >
    <pg-upload
      class="c-profile__image"
      ref="image"
      :url="form.imageUrl"
    ></pg-upload>

    <form @submit.prevent="onSubmit" class="c-profile__form mt-6">
      <div class="c-profile__form-field">
        <pg-input
          label="Nome"
          prependIcon="user"
          v-model="form.name"
        ></pg-input>
      </div>
      <div class="c-profile__form-field my-4">
        <pg-input
          label="Telefone"
          prependIcon="wallet"
          v-model="form.phone"
        ></pg-input>
      </div>
      <div class="c-profile__form-field my-4">
        <pg-input
          label="Email"
          prependIcon="email"
          v-model="form.email"
        ></pg-input>
      </div>
      <pg-item-list
        to="/configuracoes/perfil/senha"
        title="Trocar senha"
        icon="chevron-left"
        :shouldRotate="true"
      ></pg-item-list>
      <pg-button
        class="mt-4 fill-w"
        v-color="'backgroundSecondaryButton'"
        type="submit"
      >
        <span class="text--buttonContrast"> Salvar </span>
      </pg-button>
    </form>
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
export default class PgAdminSettings extends Vue {
  public form = {
    id: "",
    name: "",
    phone: "",
    imageUrl: "",
    email: ""
  };
  public user!: User;
  public $refs!: { image: PgUpload };

  public created() {
    if (this.user) {
      for (const key of Object.keys(this.form)) {
        this.form[key] = this.user[key];
      }
    }
  }

  public async onSubmit(): Promise<void> {
    if (this.$refs.image.file) {
      const media = await this.$refs.image.submit();
      this.form.imageUrl = media.url;
    }

    const user = await this.$api.users.save(this.form);

    this.$store.dispatch("user/set", { user });

    this.$router.go(-1);
  }
}
</script>
