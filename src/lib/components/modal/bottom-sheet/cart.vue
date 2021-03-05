<template>
  <div class="c-cart">
    <template v-if="user && user.id && user.address">
      <div class="c-cart__header">
        <i
          @click.prevent="onClose"
          class="c-cart__header-icon pgi pgi-chevron-left text--primary"
        ></i>
        <p class="c-cart__header-text text--normal text--bold text--primary">
          Carrinho
        </p>
        <p class="c-cart__header-text text--normal text--primary">Limpar</p>
      </div>

      <div
        class="c-cart__content"
        v-if="cart && cart.products && cart.products.length > 0"
      >
        <p
          class="c-cart__content-text text--primary text--bold text--normal mb-3"
        >
          Entregar em
        </p>

        <pg-address :address="user.address"></pg-address>

        <!-- Produtos -->
        <div class="c-cart__content-products mt-4">
          <div class="c-cart__content-products-header mb-3">
            <p class="text--foregroundTertiary text--bold text--small">
              Produtos
            </p>

            <p
              @click.prevent="onClose"
              class="c-cart__content-products-header-action text--primary text--bold text--small"
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
          </div>
        </div>

        <!-- Forma de pagamento -->
        <div class="c-cart__content-payment mt-4">
          <div class="c-cart__content-payment-header">
            <p class="text--foregroundTertiary text--bold text--small">
              Forma de pagamento
            </p>
          </div>
          <div v-if="user.cards && user.cards.length > 0">
            <div v-for="card in user.cards" :key="card.id">
              <pg-card :card="card" :canDelete="false" :goToCard="false">
                <p
                  class="c-cart__content-payment-card-change text--primary text--bold"
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
                class="c-cart__content-payment-action-text text--small text--bold"
              >
                Adicionar cartão
              </p>
            </router-link>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="bg--secondaryBackground fill-w c-cart__content-footer d-flex justify-between"
        >
          <div class="c-cart__content-footer-total">
            <p class="text--normal text--foreground">Total</p>
            <p class="text--normal text--bold text--foreground">
              R$ {{ getTotal() | formatPrice }}
            </p>
          </div>

          <button
            class="fill-w c-cart__content-footer-button bg--backgroundButton"
          >
            <span class="text--buttonContrast text--normal text--bold">
              Continuar
            </span>
          </button>
        </div>
      </div>

      <p class="c-cart__no-products text--center" v-else>
        Não há produtos no carrinho!
      </p>
    </template>
    <div class="c-cart__no-address" v-else>
      <p class="text--foreground c-cart__no-address-text">
        Você não possuí um endereço de entrega.
      </p>
      <router-link
        to="/configuracoes/endereco"
        class="text--primary text--bold c-cart__no-address-action"
      >
        Adicionar endereço
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-cart {
  padding: var(--spacing-2) var(--spacing-4);
  height: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-4);

    &-icon {
      transform: rotate(-90deg);
    }

    &-text {
      margin-bottom: 0;
    }
  }

  &__content {
    padding-bottom: var(--spacing-14);

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
          @include font-size($font-xs);
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

      &-button {
        flex: 1;
        border-radius: 33px;
        border: none;
        cursor: pointer;
        outline: none;
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
}
</style>

<script lang="ts">
import { Cart, CreateProduct, User } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapState("user", ["user"])
  }
})
export default class PgCartBottomSheet extends Vue {
  public cart: Cart;
  public user: User;

  public onClose(): void {
    this.$emit("close");
  }

  public getTotal(): number {
    return this.cart.products.reduce((acc: number, value: CreateProduct) => {
      acc += value.product.price * value.quantity;
      return acc;
    }, 0);
  }
}
</script>
