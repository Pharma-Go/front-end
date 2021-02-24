<template>
  <pg-settings
    :title="form.name ? form.name : 'Estabelecimento'"
    class="c-establishment"
  >
    <form @submit.prevent="save">
      <div class="c-establishment__field">
        <pg-upload ref="image" :url="form.imageUrl"></pg-upload>
      </div>
      <div class="c-establishment__field">
        <pg-input
          label="Nome"
          prependIcon="user"
          v-model="form.name"
        ></pg-input>
      </div>
      <div class="c-establishment__field my-4">
        <pg-input
          label="Telefone"
          prependIcon="user"
          v-model="form.phone"
        ></pg-input>
      </div>
      <div class="c-establishment__field">
        <pg-input
          label="Horário de abertura"
          prependIcon="clock"
          v-model="form.opensAt"
        ></pg-input>
      </div>
      <div class="c-establishment__field my-4">
        <pg-input
          label="Horário de fechamento"
          prependIcon="clock"
          v-model="form.closesAt"
        ></pg-input>
      </div>
      <pg-button
        class="mt-4 fill-w"
        v-color="'backgroundButton'"
        @click.prevent="save"
        type="submit"
      >
        <span class="text--contrast"> Salvar </span>
      </pg-button>
    </form>
  </pg-settings>
</template>

<style lang="scss"></style>

<script lang="ts">
import { PgUpload } from "@/lib/components";
import { Establishment } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("establishment", ["active"])
  }
})
export default class PgAdminEstablishments extends Vue {
  public active!: Establishment;
  public isEditing: boolean = this.$route.meta.isEditing;
  public form = {
    imageUrl: "",
    name: "",
    phone: "",
    opensAt: "",
    closesAt: "",
    id: ""
  };

  public $refs!: { image: PgUpload };

  public async save(): Promise<void> {
    if (this.$refs.image.file) {
      const media = await this.$refs.image.submit();
      this.form.imageUrl = media.url;
    }

    const establishment = await this.$api.establishments.save(this.form);
    const establishments = await this.$api.establishments.get();

    this.$store.dispatch("establishment/set", { active: establishment });
    this.$store.dispatch("establishment/set", { establishments });

    this.$router.push("/configuracoes/admin/estabelecimentos");
  }
}
</script>
