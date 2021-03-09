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

      <div
        class="c-establishment-product__form-field"
        v-if="categoryItems && categoryItems.length > 0"
      >
        <pg-select
          :items="categoryItems"
          :activeItem="activeCategory"
          @select="onSelect($event)"
        >
        </pg-select>
      </div>

      <div class="c-establishment-product__form-field">
        <input type="checkbox" id="available" v-model="form.available" />
        <label for="available">Disponível</label>
      </div>

      <pg-button
        class="my-4 fill-w"
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
import { Category, Product, SelectItem } from "@/lib/models";
import { category } from "@/services";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({ computed: { ...mapState("category", ["categories"]) } })
export default class PgAdminProduct extends Vue {
  public title = "Produto";
  public categoryItems: SelectItem[] = [];
  public activeCategory: SelectItem = {} as SelectItem;
  public categories!: Category[];

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
    if (!this.categories || this.categories?.length === 0) {
      const categories = await this.$api.category.get();
      await this.$store.dispatch("category/set", { categories });
    }

    console.log(this.categories);

    this.categoryItems = this.categories.map(category => ({
      name: category.name,
      value: category.id
    }));
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

  public onSelect(item: SelectItem): void {
    this.activeCategory = item;
  }
}
</script>
