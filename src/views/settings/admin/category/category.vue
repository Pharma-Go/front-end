<template>
  <pg-settings
    :canBack="true"
    backUrl="/configuracoes/admin/estabelecimentos"
    title="Categoria"
  >
    <form @submit.prevent="onSubmit">
      <pg-input label="Nome" prependIcon="user" v-model="form.name"></pg-input>

      <pg-button class="my-4 fill-w" v-color="'backgroundButton'" type="submit">
        <span class="text--contrast"> Salvar </span>
      </pg-button>
    </form>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>
  </pg-settings>
</template>

<script lang="ts">
import { Category } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgAdminSaveCategory extends Vue {
  public form: any = { name: "" };

  public snackbar: any = {
    visible: false,
    color: "error"
  };

  public async created(): Promise<void> {
    if (this.$route.params.id) {
      const category: Category = await this.$api.category.getOne(
        this.$route.params.id
      );

      for (const key of Object.keys(this.form)) {
        this.form[key] = category[key];
      }

      this.form.id = category.id;
    }
  }

  public async onSubmit(): Promise<void> {
    await this.$api.category.save(this.form).catch(err => {
      this.snackbar = {
        color: "error",
        icon: "pgi-add",
        text: err.response?.data?.error || "Erro desconhecido",
        visible: true
      };

      return Promise.reject(err);
    });

    this.$router.go(-1);
  }
}
</script>
