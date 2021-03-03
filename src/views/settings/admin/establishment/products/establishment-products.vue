<template>
  <pg-settings
    title="Produtos"
    :canBack="true"
    :backUrl="`/configuracoes/admin/estabelecimentos/${$route.params.id}`"
  >
    <div class="c-establishment-products">
      <pg-tab
        :categories="categories"
        :activeCategoryId="activeCategoryId"
        :canCreateCategory="true"
        @createCategory="onCreateCategory"
        @clickCategory="onClickCategory"
      ></pg-tab>

      <div
        class="c-establishment-products__items mt-2"
        v-if="products && products.length > 0"
      >
        <router-link
          v-for="product in products"
          :key="product.id"
          :to="
            `/configuracoes/admin/estabelecimentos/${$route.params.id}/produtos/${product.id}`
          "
        >
          <pg-product-card :product="product"></pg-product-card>
        </router-link>
      </div>

      <p v-else class="text--center mt-2">
        Ops! Parece que você não tem nenhum produto para esta categoria.
      </p>

      <router-link
        v-if="categories && categories.length > 0"
        :to="
          `/configuracoes/admin/estabelecimentos/${$route.params.id}/produtos/criar`
        "
        class="c-establishment-products__action mt-4"
      >
        <i class="c-establishment-products__action-icon pgi pgi-add mr-2"></i>
        <p
          class="c-establishment-products__action-text text--medium text--bold"
        >
          Adicionar produto
        </p>
      </router-link>
      <div class="c-establishment-products__action" v-else>
        <i class="c-establishment-products__action-icon pgi pgi-add mr-2"></i>
        <p
          class="c-establishment-products__action-text text--medium text--bold"
        >
          Adicionar categoria
        </p>
      </div>
    </div>
  </pg-settings>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-establishment-products {
  display: flex;
  flex-direction: column;

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &-icon {
      @include font-size($font-sm);
      color: var(--theme-primary);
    }

    &-text {
      color: var(--theme-primary);
      margin: 0;
    }
  }
}
</style>

<script lang="ts">
import { Category, Establishment, Product } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("category", ["categories"]),
    ...mapState("establishment", ["active"])
  }
})
export default class PgAdminEstablishmentProducts extends Vue {
  public active!: Establishment;
  public products: Product[] = [];
  public activeCategoryId = "";
  public categories!: Category[];

  public async created(): Promise<void> {
    if (!this.categories || this.categories?.length === 0) {
      const categories = await this.$api.category.get();

      this.$store.dispatch("category/set", { categories });
    }

    if (this.categories.length > 0) {
      this.activeCategoryId = this.$route.params.category
        ? this.$route.params.category
        : this.categories[0].id;

      if (!this.active.id) {
        const establishment = await this.$api.establishments.getOne(
          this.$route.params.id
        );

        this.$store.dispatch("establishment/set", { active: establishment });
      }

      this.products = this.active.products.filter(
        (product: Product) => product.category.id === this.activeCategoryId
      );
    }
  }

  public onCreateCategory(): void {
    this.$router.push("/configuracoes/admin/categoria/criar");
  }

  public async onClickCategory(id: string) {
    if (this.activeCategoryId === id) {
      this.$router.push("/configuracoes/admin/categoria/" + id);

      return;
    }

    await this.$router.replace(
      `/configuracoes/admin/estabelecimentos/${this.active.id}/produtos/categoria/${id}`
    );
    window.location.reload();
  }
}
</script>
