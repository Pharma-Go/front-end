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
      <div
        @click.prevent="onFavorite"
        class="c-establishment__header-favorite bg--secondaryBackground"
      >
        <i
          :class="[
            'c-establishment__header-favorite-icon',
            'pgi',
            { 'pgi-favorite': !hasFavorited },
            { 'pgi-favorited': hasFavorited },
            'text--primary'
          ]"
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
        @clickCategory="onClickCategory"
        class="mt-6"
      ></pg-tab>

      <div
        class="c-establishment__products mt-2"
        v-if="products && products.length > 0"
      >
        <div
          v-for="product in products"
          :key="product.id"
          @click.prevent="onClickProduct(product)"
        >
          <pg-product-card
            :product="product"
            icon="add"
            :rotateIcon="false"
          ></pg-product-card>
        </div>
      </div>
    </div>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>

    <pg-bottom-sheet :show="showBottomSheet" @close="onCloseBottomSheet">
      <pg-product-bottom-sheet
        v-if="showProductBottomSheet && activeProduct && activeProduct.id"
        @close="onCloseProductBottomSheet"
        @addProduct="onAddProduct($event)"
        :product="activeProduct"
      ></pg-product-bottom-sheet>
      <pg-cart-bottom-sheet
        v-if="showCartBottomSheet"
        @close="onCloseBottomSheet"
        @cleanupCart="onCleanupCart"
        @generateInvoice="onGenerateInvoice"
      ></pg-cart-bottom-sheet>
      <pg-confirmation-bottom-sheet
        v-if="showConfirmationBottomSheet && generatedInvoice"
        :invoice="generatedInvoice"
        :user="user"
      ></pg-confirmation-bottom-sheet>
    </pg-bottom-sheet>
  </pg-container>
</template>

<style lang="scss">
@import "../lib/styles/typography.scss";
@import "../lib/styles/mq.scss";

.c-establishment {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-back,
    &-favorite {
      width: var(--spacing-7);
      height: var(--spacing-7);
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      &-icon {
        @include font-size($font-sm);
      }
    }

    &-back {
      padding-right: 3px;
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
import {
  Category,
  CreateItemProduct,
  Establishment,
  Invoice,
  Product,
  Review,
  User
} from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("establishment", ["active"]),
    ...mapState("establishment", ["productsMostRateds"]),
    ...mapState("user", ["user"])
  }
})
export default class PgEstablishment extends Vue {
  public active!: Establishment;
  public productsMostRateds!: Product[];
  public activeCategoryId = "";
  public categories: Category[] = [];
  public user!: User;
  public products: Product[] = [];
  public hasFavorited = false;
  public showProductBottomSheet = true;
  public showBottomSheet = false;
  public showCartBottomSheet = false;
  public showConfirmationBottomSheet = false;
  public activeProduct: Product = {} as Product;
  public generatedInvoice: Invoice = {} as Invoice;

  public snackbar: any = {
    visible: false,
    color: "error"
  };

  public async created() {
    if (!this.active.id) {
      const establishment = await this.$api.establishments.getOne(
        this.$route.params.id
      );

      this.$store.dispatch("establishment/set", { active: establishment });
    }

    this.hasFavorited = !!this.user.favoriteEstablishments.find(
      establishment => establishment.id === this.$route.params.id
    );

    const products = await this.$api.products.featuredProducts(this.active.id);

    this.$store.dispatch("establishment/set", {
      productsMostRateds: products
    });

    this.categories = this.active.products.map(product => product.category);

    this.categories.sort((a: Category, b: Category) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    if (this.categories.length > 0) {
      this.activeCategoryId = this.$route.params.category
        ? this.$route.params.category
        : this.categories[0].id;

      this.products = this.active.products.filter(
        (product: Product) => product.category.id === this.activeCategoryId
      );
    }

    this.sockets.subscribe("updateInvoice", (invoice: Invoice) => {
      if (invoice.buyer.id === this.user.id) {
        this.generatedInvoice = invoice;
      }
    });
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

  public async onFavorite(): Promise<void> {
    if (this.hasFavorited) {
      await this.$api.users.removeEstablishmentFavorite(this.$route.params.id);
    } else {
      await this.$api.users.addEstablishmentFavorite(this.$route.params.id);
    }

    const user = await this.$api.users.getOne("me");
    this.hasFavorited = !this.hasFavorited;
    this.$store.dispatch("user/set", user);
  }

  public async onClickCategory(id: string) {
    await this.$router.replace(
      `/estabelecimento/${this.$route.params.id}/categoria/${id}`
    );
    window.location.reload();
  }

  public async onClickProduct(product: Product) {
    this.showBottomSheet = true;
    this.showProductBottomSheet = true;
    this.activeProduct = product;
  }

  public onCloseProductBottomSheet(): void {
    this.showBottomSheet = false;
    this.showProductBottomSheet = false;

    setTimeout(() => {
      this.showBottomSheet = true;
      this.showCartBottomSheet = true;
    }, 500);
  }

  public onCloseBottomSheet(): void {
    this.showBottomSheet = false;
    this.showProductBottomSheet = false;
    this.showCartBottomSheet = false;
    this.showConfirmationBottomSheet = false;
  }

  public async onAddProduct(createProduct: CreateItemProduct): Promise<void> {
    await this.$store.dispatch("cart/addProduct", createProduct).catch(err => {
      this.snackbar = {
        color: "error",
        icon: "pgi-close",
        text:
          "Não pode adicionar produtos de diferentes farmácias no mesmo pedido.",
        visible: true
      };
      return Promise.reject(err);
    });

    this.onCloseProductBottomSheet();
  }

  public async onCleanupCart(): Promise<void> {
    await this.$store.dispatch("cart/clean");
  }

  public async onGenerateInvoice(invoice: Invoice): Promise<void> {
    this.showBottomSheet = false;
    this.showCartBottomSheet = false;

    if (!this.generatedInvoice.id) {
      this.generatedInvoice = await this.$api.invoices.getOne(invoice.id);
    }

    await this.$store.dispatch("cart/clean");

    setTimeout(() => {
      this.showConfirmationBottomSheet = true;
      this.showBottomSheet = true;
    }, 500);
  }

  public beforeDestroy(): void {
    this.sockets.unsubscribe("updateInvoice");
  }
}
</script>
