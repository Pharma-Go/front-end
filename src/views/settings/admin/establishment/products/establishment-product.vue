<template>
  <pg-settings
    :title="title"
    :canBack="true"
    :backUrl="
      `/configuracoes/admin/estabelecimentos/${$route.params.id}/produtos`
    "
    class="c-establishment-product"
  >
    <form @submit.prevent="onSubmit" class="c-establishment-product__form">
      <div class="c-establishment-product__form-field">
        <pg-input
          label="Nome"
          prependIcon="user"
          v-model="form.name"
        ></pg-input>
      </div>

      <div class="c-establishment-product__form-field">
        <pg-input
          label="Preço"
          prependIcon="user"
          v-model="form.price"
        ></pg-input>
      </div>

      <div class="c-establishment-product__form-field">
        <input type="checkbox" id="available" v-model="form.available" />
        <label for="available">Disponível</label>
      </div>

      <pg-button class="my-4 fill-w" v-color="'backgroundSecondaryButton'" type="submit">
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
import { Product } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgAdminProduct extends Vue {
  public title = "Produto";

  public form = {
    name: "",
    imageUrl: "",
    price: "",
    category: "",
    establishment: "",
    available: true
  };

  public snackbar: any = {
    visible: false,
    color: "error"
  };

  public async created(): Promise<void> {
    if (this.$route.params.product) {
      const product: Product = await this.$api.products.getOne(
        this.$route.params.product
      );

      this.title = product.name;

      for (const key of Object.keys(this.form)) {
        this.form[key] = product[key];
      }

      this.form["id"] = product.id;
    }
  }

  public async onSubmit(): Promise<void> {
    await this.$api.products.save(this.form).catch(err => {
      this.snackbar = {
        color: "error",
        icon: "pgi-close",
        text: err.response?.data?.error || "Erro desconhecido",
        visible: true
      };

      return Promise.reject(err);
    });

    this.$router.go(-1);
  }
}
</script>
