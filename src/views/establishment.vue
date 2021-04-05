<template>
  <pg-container
    class="c-establishment bg--backgroundMedium"
    v-if="active && active.id"
    :hasHorizontalPadding="activePaddings"
    :hasVerticalPadding="activePaddings"
  >
    <div class="c-content pa-0 pb-6">
      <div class="c-establishment__header">
        <div
          class="c-establishment__header-action c-establishment__header-action-back"
        >
          <i class="pgi pgi-chevron-left"></i>
        </div>
        <div
          class="c-establishment__header-action c-establishment__header-action-favorite"
        >
          <i class="pgi pgi-favorite"></i>
        </div>
        <img
          class="c-establishment__header-image"
          src="https://images.unsplash.com/photo-1617191979724-f755c6d83e01?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"
          alt=""
        />
      </div>

      <pg-loading
        class="c-establishment__loading"
        v-if="isLoading"
      ></pg-loading>

      <div v-else>
        <div class="c-establishment__title">
          <div class="d-flex align-center">
            <img
              class="c-establishment__title-image"
              :src="active.imageUrl"
              :alt="active.name"
            />
            <h1 class="c-establishment__title-text">{{ active.name }}</h1>
          </div>

          <div class="c-establishment__title-feedback d-flex align-center">
            <i
              class="c-establishment__title-feedback-icon text--feedbackWarningMedium pgi pgi-star"
            ></i>
            <p
              class="c-establishment__title-feedback-text text--feedbackWarningMedium mb-0"
            >
              {{ countStarsReviews() }}
            </p>
          </div>
        </div>

        <div class="c-establishment__content mt-6">
          <div class="c-content c-establishment__content-highlights">
            <p class="c-establishment__content-highlights-title mb-0">
              Destaques
            </p>

            <div
              class="c-establishment__content-highlights-products d-flex px-1 py-4"
            >
              <div
                class="c-establishment__content-highlights-products-card"
                v-for="product in productsMostRateds"
                :key="product.id"
              >
                <pg-product-card
                  :product="product"
                  @clickCard="onClickProduct"
                ></pg-product-card>
              </div>
            </div>
          </div>

          <div
            class="c-establishment__content-category"
            v-for="productCategory of Object.entries(products)"
            :key="productCategory[0]"
          >
            <p
              class="c-establishment__content-category-title text--neutralDarkest mb-0"
            >
              {{ productCategory[0] }}
            </p>

            <div
              class="c-establishment__content-category-products d-flex px-1 py-4"
            >
              <div
                class="c-establishment__content-category-products-card"
                v-for="product in productCategory[1]"
                :key="product.id"
              >
                <pg-product-card
                  :product="product"
                  class="bg--backgroundMedium"
                  @clickCard="onClickProduct"
                ></pg-product-card>
              </div>
            </div>
          </div>

          <!-- div.c-establishment__content -->
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
  height: 100vh;

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
  }

  &__loading {
    width: var(--spacing-6);
    height: var(--spacing-6);
    margin: var(--spacing-4) auto;
  }

  &__header {
    width: 100%;
    position: relative;

    &-action {
      position: absolute;
      top: 50%;

      width: var(--spacing-9);
      height: var(--spacing-9);

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 100%;
      background: var(--theme-backgroundLight);
      transform: translateY(-50%);
      box-shadow: var(--theme-shadowLevel1);
      color: var(--theme-neutralDarkest);
      font-size: $font-size-md;
      cursor: pointer;

      @include mq($until: tablet-landscape) {
        width: var(--spacing-7);
        height: var(--spacing-7);
        font-size: $font-size-sm;
      }

      &-back {
        display: none;
        left: var(--spacing-12);
        padding-right: 3px;

        @include mq($until: tablet-landscape) {
          display: flex;
          left: var(--spacing-4);
        }
      }

      &-favorite {
        right: var(--spacing-12);
        color: var(--theme-feedbackErrorMedium);

        @include mq($until: tablet-landscape) {
          right: var(--spacing-4);
        }
      }
    }

    &-image {
      width: 100%;
      height: 170px;

      background: var(--theme-primary500);
      object-fit: cover;
      border-radius: var(--spacing-4) var(--spacing-4) 0 0;

      @include mq($until: tablet-landscape) {
        height: 126px;
        border-radius: 0;
      }
    }
  }

  &__title {
    width: 100%;
    margin-top: var(--spacing-4);
    padding: 0 var(--spacing-12);
    display: flex;
    justify-content: space-between;

    @include mq($until: tablet-landscape) {
      padding: 0 var(--spacing-4);
    }

    &-image {
      margin-right: var(--spacing-6);
      border-radius: var(--spacing-1);
      width: 85px;
      height: 85px;

      @include mq($until: tablet-landscape) {
        margin-right: var(--spacing-3);
      }
    }

    &-text {
      font-size: $font-size-lg;
      color: var(--theme-neutralDarkest);

      @include mq($until: tablet-landscape) {
        font-size: $font-size-md;
      }
    }

    &-feedback {
      cursor: pointer;

      &-icon,
      &-text {
        font-size: $font-size-sm;
        font-weight: 700;
      }

      &-icon {
        margin-right: var(--spacing-1);
      }
    }
  }

  &__content {
    margin: 0 var(--spacing-12);

    @include mq($until: tablet-landscape) {
      margin: 0 var(--spacing-4);
    }

    &-highlights {
      background: var(--theme-backgroundMedium) !important;

      &-title {
        font-size: $font-size-sm;
        font-weight: 700;
        color: var(--theme-neutralDarkest);

        @include mq($until: tablet-landscape) {
          font-size: $font-size-xs;
        }
      }

      &-products {
        display: flex;
        overflow-x: scroll;

        &-card {
          margin-right: var(--spacing-4);
        }
      }
    }

    &-category {
      margin-top: var(--spacing-6);
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
  public products: Record<string, Product[]> = {};
  public hasFavorited = false;
  public showProductBottomSheet = true;
  public showBottomSheet = false;
  public showCartBottomSheet = false;
  public showConfirmationBottomSheet = false;
  public activeProduct: Product = {} as Product;
  public generatedInvoice: Invoice = {} as Invoice;

  public activePaddings = false;
  public isLoading = false;

  public snackbar: any = {
    visible: false,
    color: "feedbackErrorMedium"
  };

  public async created() {
    this.activePaddings = window.screen.width >= 480;
    this.isLoading = true;

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

    await this.$store.dispatch("establishment/set", {
      productsMostRateds: products
    });

    this.products = this.active.products.reduce((acc, element) => {
      if (!acc[element.category.name]) {
        acc[element.category.name] = [element];
      } else {
        acc[element.category.name].push(element);
      }

      return acc;
    }, {});

    this.isLoading = false;

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
    await this.$store
      .dispatch("cart/addProduct", {
        createProduct,
        establishment: this.active
      })
      .catch(err => {
        this.snackbar = {
          color: "feedbackErrorMedium",
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
