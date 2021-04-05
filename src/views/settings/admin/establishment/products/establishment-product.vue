<template>
  <pg-settings
    :title="title"
    :canBack="true"
    :backUrl="`/configuracoes/admin/estabelecimentos/${$route.params.id}/produtos`"
    class="c-establishment-product pt-5"
  >
    <form @submit.prevent="onSubmit" class="c-establishment-product__form">
      <div
        class="c-establishment-product__form-field"
        v-if="categoryItems && categoryItems.length > 0"
      >
        <pg-select
          label="Selecione uma categoria"
          :items="categoryItems"
          :activeItem="activeCategory"
          @select="onSelect($event)"
        >
        </pg-select>
      </div>

      <div class="c-establishment-product__form-field mt-2">
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
          v-model.lazy="form.price"
          v-money="money"
        ></pg-input>
      </div>

      <div class="c-establishment-product__form-field mt-2">
        <textarea
          v-model="form.description"
          class="c-establishment-product__form-field-textarea"
          placeholder="Digite a descrição do produto..."
        ></textarea>
      </div>

      <div class="c-establishment-product__form-field mt-2">
        <pg-checkbox
          v-model="form.strict"
          :checked="form.strict"
          title="Necessário receita médica?"
          @check="onCheckStrict"
        ></pg-checkbox>
      </div>

      <div class="c-establishment-product__form-field mt-2">
        <pg-checkbox
          v-model="form.available"
          :checked="form.available"
          title="Disponível"
          @check="onCheckAvailable"
        ></pg-checkbox>
      </div>

      <pg-button
        class="mt-4 mb-2 fill-w"
        v-color="'backgroundSecondaryButton'"
        type="submit"
      >
        <span class="text--buttonContrast"> Salvar </span>
      </pg-button>

      <p
        class="mb-0 text--center text--primary cursor--pointer"
        v-if="form.id"
        @click.prevent="onDelete"
      >
        Excluir
      </p>
    </form>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>
  </pg-settings>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-establishment-product {
  &__form {
    &-field {
      &-textarea {
        font-size: $font-size-xxxs;
        font-family: unquote($global-body-font);

        width: 100%;
        height: calc(var(--spacing-1) * 16);
        padding: var(--spacing-2);
        outline: none;
        border-radius: var(--spacing-1);
        border: none;
        box-shadow: 0 0 0 1px #7c7c7c;
        resize: none;

        &::placeholder {
          font-size: $font-size-xxxs;

          font-family: unquote($global-body-font);
        }

        &::-webkit-scrollbar {
          width: 3px;
          height: 1px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
          background: var(--theme-loadingBackground);
          margin: var(--spacing-1) 0;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
          background: var(--theme-primary);
          border-radius: var(--spacing-1);
        }
      }
    }
  }
}
</style>

<script lang="ts">
import {
  Category,
  CreateItemProduct,
  CreateProduct,
  Product,
  SelectItem
} from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { VMoney } from "v-money";
import { cleanCurrencyMask } from "@/lib/utils/price";

@Component({
  computed: { ...mapState("category", ["categories"]) },
  directives: {
    money: VMoney
  }
})
export default class PgAdminProduct extends Vue {
  public title = "Produto";
  public categoryItems: SelectItem[] = [];
  public activeCategory: SelectItem = {} as SelectItem;
  public categories!: Category[];

  public money = {
    decimal: ",",
    thousands: ".",
    prefix: "R$ ",
    precision: 2,
    masked: false
  };

  public form: CreateProduct = {
    name: "",
    imageUrl: "",
    price: "",
    establishment: "",
    strict: false,
    available: true,
    description: ""
  };

  public snackbar: any = {
    visible: false,
    color: "feedbackErrorMedium"
  };

  public async created(): Promise<void> {
    if (this.$route.params.product) {
      const product: Product = await this.$api.products.getOne(
        this.$route.params.product
      );

      this.title = product.name;

      for (const key of Object.keys(this.form)) {
        this.form[key] =
          key === "price" ? product[key].toString() : product[key];
      }

      this.form["id"] = product.id;

      this.activeCategory = {
        name: product.category.name,
        value: product.category.id
      };
    }

    if (!this.categories || this.categories?.length === 0) {
      const categories = await this.$api.category.get();
      await this.$store.dispatch("category/set", { categories });
    }

    this.categoryItems = this.categories.map(category => ({
      name: category.name,
      value: category.id
    }));
  }

  public async onSubmit(): Promise<void> {
    this.form["category"] = this.activeCategory.value;
    this.form.establishment = this.$route.params.id;

    if (!this.activeCategory.value) {
      this.openErrorSnackbar("Escolha uma categoria para o produto");
      return;
    }

    if (!this.form.name) {
      this.openErrorSnackbar("Escreva um nome para o produto");
      return;
    }

    if (!this.form.price) {
      this.openErrorSnackbar("Escolha um preço para o produto");
      return;
    }

    const price = cleanCurrencyMask(this.form.price);

    await this.$api.products
      .save({
        ...this.form,
        price: Number(price)
      })
      .catch(err => {
        this.snackbar = {
          color: "feedbackErrorMedium",
          icon: "pgi-close",
          text: err.response?.data?.error || "Erro desconhecido",
          visible: true
        };

        return Promise.reject(err);
      });

    this.$router.go(-1);
  }

  private openErrorSnackbar(text: string): void {
    this.snackbar = {
      color: "feedbackErrorMedium",
      icon: "pgi-close",
      text: text,
      visible: true
    };
  }

  public onSelect(item: SelectItem): void {
    this.activeCategory = item;
  }

  public onCheckAvailable(): void {
    this.form.available = !this.form.available;
  }

  public onCheckStrict(): void {
    this.form.strict = !this.form.strict;
  }

  public async onDelete(): Promise<void> {
    await this.$api.products.deleteOne(this.form["id"]);
    this.$router.go(-1);
  }
}
</script>
