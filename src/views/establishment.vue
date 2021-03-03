<template>
  <pg-container
    class="c-establishment bg--background"
    v-if="active && active.id"
  >
    <div class="c-establishment__header mb-4">
      <div
        @click.prevent="$router.back"
        class="c-establishment__header-back bg--secondaryBackground"
      >
        <i
          class="c-establishment__header-back-icon pgi pgi-chevron-left text--primary"
        ></i>
      </div>
    </div>

    <img
      class="c-establishment__image"
      v-if="active.imageUrl"
      :src="active.imageUrl"
      :alt="active.name"
    />

    <div class="c-establishment__content mt-5">
      <div class="c-establishment__content-title">
        <h1
          :class="[
            'c-establishment__content-title-text',
            { 'fill-w': !hasReviews() },
            { 'text--center': !hasReviews() }
          ]"
        >
          {{ active.name }}
        </h1>

        <div class="c-establishment__content-title-stars" v-if="hasReviews()">
          <i
            class="c-establishment__content-title-stars-icon pgi pgi-star text--primary mr-1"
          ></i>
          <p
            class="c-establishment__content-title-stars-text text--primary text--bold text--large"
          >
            {{ countStarsReviews() }}
          </p>
        </div>
      </div>

      <h2 class="mt-6">Destaques</h2>
      <div
        class="c-establishment__content-highlights mt-3"
        v-if="productsMostRateds && productsMostRateds.length > 0"
      >
        <div
          class="c-establishment__content-product mr-4"
          v-for="product in productsMostRateds"
          :key="product.id"
        >
          <pg-establishment-product-card
            :product="product"
          ></pg-establishment-product-card>
        </div>
      </div>

      <pg-tab
        :categories="categories"
        :activeCategoryId="activeCategoryId"
        class="mt-6"
      ></pg-tab>

      <div
        class="c-establishment__products mt-2"
        v-if="products && products.length > 0"
      >
        <router-link
          v-for="product in products"
          :key="product.id"
          :to="
            `/configuracoes/admin/estabelecimentos/${$route.params.id}/produtos/${product.id}`
          "
        >
          <pg-product-card
            :product="product"
            icon="add"
            :rotateIcon="false"
          ></pg-product-card>
        </router-link>
      </div>
    </div>
  </pg-container>
</template>

<style lang="scss">
@import "../lib/styles/typography.scss";

.c-establishment {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-back {
      width: var(--spacing-7);
      height: var(--spacing-7);
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 3px;

      cursor: pointer;

      &-icon {
        @include font-size($font-sm);
      }
    }
  }

  &__image {
    width: calc(var(--spacing-base) * 31);
    height: calc(var(--spacing-base) * 31);
    object-fit: cover;
    border-radius: var(--spacing-1);
  }

  &__content {
    width: 100%;

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      &-text {
        margin-bottom: 0;
      }

      &-stars {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        &-icon {
          @include font-size($font-sm);
        }

        &-text {
          margin-bottom: 0;
        }
      }
    }

    &-highlights {
      display: flex;
      overflow-x: scroll;
      padding: var(--spacing-1);
    }
  }
}
</style>

<script lang="ts">
import { Category, Establishment, Product, Review } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("establishment", ["active"]),
    ...mapState("establishment", ["productsMostRateds"]),
    ...mapState("category", ["categories"])
  }
})
export default class PgEstablishment extends Vue {
  public active!: Establishment;
  public productsMostRateds!: Product[];
  public activeCategoryId = "";
  public categories!: Category[];
  public products: Product[] = [];

  public async created() {
    if (!this.active.id) {
      const establishment = await this.$api.establishments.getOne(
        this.$route.params.id
      );

      this.$store.dispatch("establishment/set", { active: establishment });
    }

    if (!this.productsMostRateds || this.productsMostRateds?.length === 0) {
      const products = await this.$api.products.featuredProducts(
        this.active.id
      );

      this.$store.dispatch("establishment/set", {
        productsMostRateds: products
      });
    }

    if (!this.categories || this.categories?.length === 0) {
      const categories = await this.$api.category.get();

      this.$store.dispatch("category/set", { categories });
    }

    if (this.categories.length > 0) {
      this.activeCategoryId = this.$route.params.category
        ? this.$route.params.category
        : this.categories[0].id;

      this.products = this.active.products.filter(
        (product: Product) => product.category.id === this.activeCategoryId
      );
    }
  }

  public countStarsReviews(): number {
    if (this.active && this.active.reviews) {
      const totalReviews: number = this.active.reviews.reduce(
        (acc: number, review: Review) => {
          acc += review.stars / 100;
          return acc;
        },
        0
      );

      return totalReviews / this.active.reviews.length || 0;
    }

    return 0;
  }

  public hasReviews(): boolean {
    return this.active.reviews && this.active.reviews.length > 0;
  }
}
</script>
