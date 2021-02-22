<template>
  <pg-container class="c-establishment bg--background" v-if="establishment">
    <!-- <div class="c-establishment__header mb-4">
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
      v-if="establishment.imageUrl"
      :src="establishment.imageUrl"
      :alt="establishment.name"
    />

    <div class="c-establishment__content mt-5">
      <div class="c-establishment__content-title">
        <h1 class="c-establishment__content-title-text">
          {{ establishment.name }}
        </h1>

        <div class="c-establishment__content-title-stars">
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
        v-if="featuredProducts && featuredProducts.length > 0"
      >
        <div
          class="c-establishment__content-product"
          v-for="product in featuredProducts"
          :key="product.id"
        >
          <pg-product-card :product="product"></pg-product-card>
        </div>
      </div>
    </div> -->
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
        @include font-size($global-delta-size);
      }
    }
  }

  &__image {
    width: calc(var(--spacing-base) * 31);
    height: calc(var(--spacing-base) * 31);
    object-fit: cover;
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
          @include font-size($global-delta-size);
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
import { Establishment, Product, Review } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  // computed: {
  //   ...mapGetters("establishment", { establishment: "getActive" }),
  //   ...mapGetters("establishment", {
  //     featuredProducts: "getProductsMostRateds"
  //   })
  // }
})
export default class PgEstablishment extends Vue {
  // public establishment!: Establishment;
  // public featuredProducts!: Product[];

  // public async created() {
  //   if (!this.establishment.id) {
  //     const establishment = await this.$api.establishments.getOne(
  //       this.$route.params.id
  //     );

  //     this.$store.dispatch("establishment/set", { establishment });
  //   }

  //   if (!this.featuredProducts || this.featuredProducts?.length === 0) {
  //     const products = await this.$api.products.featuredProducts(
  //       this.establishment.id
  //     );

  //     this.$store.dispatch("establishment/set", { products });
  //   }
  // }

  // public countStarsReviews(): number {
  //   if (this.establishment && this.establishment.reviews) {
  //     const totalReviews: number = this.establishment.reviews.reduce(
  //       (acc: number, review: Review) => {
  //         acc += review.stars / 100;
  //         return acc;
  //       },
  //       0
  //     );

  //     return totalReviews / this.establishment.reviews.length;
  //   }

  //   return 0;
  // }
}
</script>
