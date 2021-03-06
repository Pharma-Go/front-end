<template>
  <div class="c-cart">
    <template v-if="user && user.id && user.address">
      <div class="c-cart__header">
        <i
          @click.prevent="onClose"
          class="c-cart__header-icon c-cart__header-icon--rotate pgi pgi-chevron-left text--primary500"
        ></i>
        <p class="c-cart__header-text text--xxs text--bold text--primary500">
          Carrinho
        </p>
        <i
          @click.prevent="onCleanupCart"
          class="c-cart__header-icon text--xs pgi pgi-trash text--primary500"
        ></i>
      </div>

      <div
        class="c-cart__content"
        v-if="cart && cart.products && cart.products.length > 0"
      >
        <p
          class="c-cart__content-text text--primary500 text--bold text--xxs mb-3"
        >
          Entregar em
        </p>

        <pg-address :address="user.address"></pg-address>

        <div class="d-flex align-center justify-between mt-2">
          <p class="mb-0">Taxa de entrega</p>
          <p class="mb-0 text--bold">R$ {{ deliveryFee | formatPrice }}</p>
        </div>

        <!-- Produtos -->
        <div class="c-cart__content-products mt-4">
          <div class="c-cart__content-products-header mb-3">
            <p class="text--neutralDarkestTertiary text--bold text--xxxs">
              Produtos
            </p>

            <p
              @click.prevent="onClose"
              class="c-cart__content-products-header-action text--primary500 text--bold text--xxxs"
            >
              Adicionar mais itens
            </p>
          </div>

          <div
            class="c-cart__content-products-product"
            v-for="product in cart.products"
            :key="product.product.id"
          >
            <pg-product-card :product="product.product" :isQuantity="true">
              <template v-slot:quantity>
                <p
                  class="c-cart__content-products-product-quantity bg--primary text--contrast text--bold"
                >
                  {{ product.quantity }}
                </p>
              </template>
            </pg-product-card>
            <div v-if="product.product.strict" class="mt-2">
              <pg-upload
                ref="image"
                @uploaded="onUpload($event, product.product)"
              >
                <template v-slot:placeholder>
                  <div class="d-flex justify-start align-center fill-w">
                    <i class="pgi pgi-add text--primary500 text--sm mr-2"></i>
                    <p class="text--xxs text--neutralDarkest mb-0">
                      Clique para subir a receita médica
                    </p>
                  </div>
                </template>
              </pg-upload>
            </div>
          </div>
        </div>

        <!-- Forma de pagamento -->
        <div class="c-cart__content-payment mt-4">
          <div class="c-cart__content-payment-header">
            <p class="text--neutralDarkestTertiary text--bold text--xxxs">
              Forma de pagamento
            </p>
          </div>
          <div v-if="user.cards && user.cards.length > 0">
            <div @click.prevent="changePaymentMethod">
              <pg-card
                :card="cart.payment"
                :canDelete="false"
                :goToCard="false"
              >
                <p
                  class="c-cart__content-payment-card-change text--primary500 text--bold"
                >
                  Trocar
                </p>
              </pg-card>
            </div>
          </div>

          <div v-else>
            <router-link
              to="/configuracoes/cartoes/criar"
              class="c-cart__content-payment-action mt-4"
            >
              <i
                class="c-cart__content-payment-action-icon pgi pgi-add mr-2"
              ></i>
              <p
                class="c-cart__content-payment-action-text text--xxxs text--bold"
              >
                Adicionar cartão
              </p>
            </router-link>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="bg--background fill-w c-cart__content-footer d-flex justify-between"
        >
          <div class="c-cart__content-footer-total">
            <p class="text--xxs text--neutralDarkest mb-1">Total</p>
            <p class="text--xxs text--bold text--neutralDarkest">
              R$ {{ getTotal() | formatPrice }}
            </p>
          </div>

          <div class="fill-w c-cart__content-footer-action">
            <button
              @click.prevent="onSubmit"
              v-if="!isLoading"
              class="fill-w c-cart__content-footer-button bg--backgroundButtonMedium"
            >
              <span class="text--textButtonMedium text--xxs text--bold">
                Continuar
              </span>
            </button>
            <div v-else class="c-cart__content-footer-loading">
              <pg-loading></pg-loading>
            </div>
          </div>
        </div>
      </div>

      <p class="c-cart__no-products text--center" v-else>
        Não há produtos no carrinho!
      </p>
    </template>

    <div class="c-cart__no-address" v-else>
      <p class="text--neutralDarkest c-cart__no-address-text">
        Você não possuí um endereço de entrega.
      </p>
      <router-link
        to="/configuracoes/endereco"
        class="text--primary500 text--bold c-cart__no-address-action"
      >
        Adicionar endereço
      </router-link>
    </div>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>

    <pg-dialog :show="showDialog" @close="onCloseDialog">
      <div class="c-cart__cards" v-if="user.cards">
        <h1 class="text--neutralDarkest text--xxs mb-2">
          Escolha a forma de pagamento:
        </h1>
        <div class="c-cart__cards-content">
          <div
            v-for="(card, index) in user.cards"
            :key="card.id"
            :class="[
              'fill-w',
              'c-cart__cards-content-card',
              { 'mb-4': index !== user.cards.length - 1 }
            ]"
            @click.prevent="onSelectCard(card)"
          >
            <pg-profile-card :card="card"></pg-profile-card>
          </div>
        </div>
      </div>
    </pg-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "@/lib/styles/typography.scss";
@import "@/lib/styles/depth.scss";

.c-cart {
  padding: var(--spacing-2) var(--spacing-4);
  height: 100%;
  position: relative;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-4);

    &-icon {
      cursor: pointer;

      &--rotate {
        transform: rotate(-90deg);
      }
    }

    &-text {
      margin-bottom: 0;
    }
  }

  &__content {
    padding-bottom: var(--spacing-15);

    &-products {
      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        > p {
          margin: 0;
        }

        &-action {
          cursor: pointer;
        }
      }

      &-product {
        display: inline-flex;
        padding-bottom: var(--spacing-2);
        border-bottom: 1px solid var(--dark-foregroundSecondary);
        flex-direction: column;

        .c-product-card__items-product {
          border: none;
        }

        .c-upload {
          width: 100%;
          height: auto;
          max-height: calc(var(--spacing-16) * 2);
        }

        &-quantity {
          margin: 0;
          width: var(--spacing-4);
          height: var(--spacing-4);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: var(--spacing-1);
          border-radius: 100%;
        }
      }
    }

    &-payment {
      &-action {
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        &-icon {
          font-size: $font-size-xs;

          color: var(--theme-primary);
        }

        &-text {
          color: var(--theme-primary);
          margin: 0;
        }
      }

      &-card {
        &-change {
          margin: 0;
        }
      }
    }

    &-footer {
      box-shadow: var(--theme-shadowLevel1);

      position: fixed;
      padding: var(--spacing-2) var(--spacing-4);
      bottom: 0;
      left: 0;
      right: 0;
      border-top-left-radius: var(--spacing-4);
      border-top-right-radius: var(--spacing-4);

      &-total {
        flex: 1;

        > p {
          margin: 0;
        }
      }

      &-action {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &-button {
        flex: 1;
        border-radius: 33px;
        border: none;
        cursor: pointer;
        outline: none;
        height: 100%;
      }

      &-loading {
        width: var(--spacing-4);
        height: var(--spacing-4);
      }
    }
  }

  &__no-address {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > p {
      margin: 0;
    }
  }

  &__cards {
    padding: var(--spacing-4);

    &-content {
      overflow-y: scroll;
      max-height: calc(var(--spacing-1) * 50);

      &-card {
        cursor: pointer;
      }
    }
  }
}
</style>

<script lang="ts">
import {
  Address,
  Card,
  Cart,
  CreateInvoice,
  CreateItemProduct,
  Product,
  User
} from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { PgUpload } from "../../upload";

@Component({
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapState("user", ["user"])
  }
})
export default class PgCartBottomSheet extends Vue {
  public cart: Cart;
  public user: User;
  public deliveryFee = 0;
  public showDialog = false;
  public prescriptions: { file: File; productId: string }[] = [];
  public $refs!: { image: PgUpload };
  public isLoading = false;
  public hasProductStrit = false;
  public snackbar: any = {
    visible: false,
    color: "feedbackErrorMedium"
  };

  public async created() {
    if (
      this.cart &&
      this.cart.products &&
      this.user &&
      this.user.cards &&
      this.user.cards.length > 0
    ) {
      await this.$store.dispatch("cart/set", {
        cart: { ...this.cart, payment: this.user.cards[0] }
      });

      const userAddress: Address = this.user.address;
      const establishmentAddress: Address = this.cart.establishment.address;
      const distance = this.getDistance(
        userAddress.lat,
        userAddress.lon,
        establishmentAddress.lat,
        establishmentAddress.lon
      );

      this.deliveryFee = Number(
        (this.cart.establishment.deliveryFeePerKm * (distance / 1000)).toFixed(
          0
        )
      );

      this.cart.products.forEach((product: CreateItemProduct) => {
        if (product.product.strict) {
          this.hasProductStrit = true;
        }
      });
    }
  }

  public onClose(): void {
    this.$emit("close");
  }

  public onCleanupCart(): void {
    this.$emit("cleanupCart");
  }

  public onCloseDialog(): void {
    this.showDialog = false;
  }

  public changePaymentMethod(): void {
    this.showDialog = true;
  }

  public rad(x: any) {
    return (x * Math.PI) / 180;
  }

  public getDistance(lat1, lng1, lat2, lng2) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = this.rad(lat2 - lat1);
    const dLong = this.rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(lat1)) *
        Math.cos(this.rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  public async onSelectCard(card: Card): Promise<void> {
    this.showDialog = false;

    await this.$store.dispatch("cart/set", {
      cart: { ...this.cart, payment: card }
    });
  }

  public getTotal(): number {
    return (
      this.cart.products.reduce((acc: number, value: CreateItemProduct) => {
        acc += value.product.price * value.quantity;
        return acc;
      }, 0) + this.deliveryFee
    );
  }

  public onUpload(file: File, product: Product): void {
    this.prescriptions.push({ file, productId: product.id });
  }

  public async onSubmit(): Promise<void> {
    this.isLoading = true;

    if (this.hasProductStrit) {
      if (this.prescriptions && this.prescriptions.length > 0) {
        for (const prescription of this.prescriptions) {
          const prescriptionFile = await this.$api.medias
            .upload(prescription.file, null)
            .catch(err => {
              this.snackbar = {
                color: "feedbackErrorMedium",
                icon: "pgi-add",
                text: err.response?.data?.message || "Erro desconhecido",
                visible: true
              };

              this.isLoading = false;
              return Promise.reject(err);
            });

          const index = this.cart.products.findIndex(
            product => product.product.id === prescription.productId
          );

          this.cart.products[index].prescriptionUrl = prescriptionFile.url;
        }
      } else {
        this.isLoading = false;
        this.snackbar = {
          color: "feedbackErrorMedium",
          icon: "pgi-close",
          text: "É obrigatório receita médica em alguns produtos.",
          visible: true
        };

        return;
      }
    }

    if (!this.cart.establishment) {
      this.snackbar = {
        color: "feedbackErrorMedium",
        icon: "pgi-close",
        text: "Não é possível efetuar a compra sem um estabelecimento",
        visible: true
      };

      this.isLoading = false;

      return;
    }

    const createInvoice: CreateInvoice = {
      discount: 0,
      itemProducts: this.cart.products,
      paymentCard: this.cart.payment.id,
      paymentMethod: this.cart.payment.method,
      establishment: this.cart.establishment.id,
      deliveryFeeAmount: this.deliveryFee
    };

    const invoice = await this.$api.invoices.save(createInvoice).catch(err => {
      let error = "Erro desconhecido";

      if (err.response && err.response.data && err.response.data) {
        error = err.response.data.message;
      }

      if (
        err.response &&
        err.response.data &&
        err.response.data.response &&
        err.response.data.response.errors &&
        err.response.data.response.errors.length > 0 &&
        err.response.data.response.errors[0].message
      ) {
        error = err.response.data.response.errors[0].message;
      }

      this.snackbar = {
        color: "feedbackErrorMedium",
        icon: "pgi-close",
        text: error,
        visible: true
      };

      this.isLoading = false;

      return Promise.reject(err);
    });

    const recents = await this.$api.invoices.recents();
    await this.$store.dispatch("invoice/set", { recents });

    this.isLoading = false;
    this.$emit("generateInvoice", invoice);
  }
}
</script>
