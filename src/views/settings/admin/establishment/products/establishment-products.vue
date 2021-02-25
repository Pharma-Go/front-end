<template>
  <pg-settings
    title="Produtos"
    :canBack="true"
    :backUrl="`/configuracoes/admin/estabelecimentos/${$route.params.id}`"
  >
    <div class="c-establishment-products">
      <div
        class="c-establishment-products__header"
        v-if="activeCategoryId && categories && categories.length > 0"
      >
        <div class="c-establishment-products__header-tabs">
          <p
            v-for="category in categories"
            :key="category.id"
            @click.prevent="clickCategory(category.id)"
            :class="[
              'c-establishment-products__header-tabs-tab',
              { 'text--bold': category.id === activeCategoryId }
            ]"
          >
            {{ category.name }}
          </p>
        </div>

        <div
          class="c-establishment-products__header-icon bg--secondaryBackground"
          title="Adicionar categoria"
          @click.prevent="createCategory"
        >
          <i
            class="c-establishment-products__header-icon-content pgi pgi-add"
          ></i>
        </div>
      </div>

      <div
        class="c-establishment-products__items mt-2"
        v-if="products && products.length > 0"
      >
        <pg-product-card
          v-for="product in products"
          :key="product.id"
          :product="product"
        ></pg-product-card>
      </div>

      <p v-else class="text--center mt-2">
        Ops! Parece que você não tem nenhum produto para esta categoria.
      </p>

      <div
        v-if="categories && categories.length > 0"
        class="c-establishment-products__action mt-4"
      >
        <i class="c-establishment-products__action-icon pgi pgi-add mr-2"></i>
        <p
          class="c-establishment-products__action-text text--medium text--bold"
        >
          Adicionar produto
        </p>
      </div>
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

  &__header {
    display: flex;
    height: var(--spacing-5);
    justify-content: space-between;
    align-items: center;

    &-tabs {
      display: flex;
      height: 100%;
      overflow-x: scroll;
      width: 85%;

      &-tab {
        white-space: nowrap;
        margin: 0 9px;
      }
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      height: 100%;
      width: var(--spacing-5);
      cursor: pointer;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &-icon {
      @include font-size($font-sm);
    }

    &-text {
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

  public createCategory(): void {
    this.$router.push("/configuracoes/admin/categoria/criar");
  }

  public clickCategory(id: string): void {
    if (this.activeCategoryId === id) {
      this.$router.push("/configuracoes/admin/categoria/" + id);

      return;
    }

    this.$router.replace(
      `/configuracoes/admin/estabelecimentos/${this.active.id}/produtos/${id}`
    );
    window.location.reload();
  }
}
</script>
