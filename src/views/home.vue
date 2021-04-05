<template>
  <div class="c-home" v-if="user">
    <pg-container>
      <div class="c-home__header">
        <h3 class="c-home__header-title text--neutralDarkest mr-2">
          {{ user.name }}
        </h3>
        <router-link to="/configuracoes">
          <img
            v-if="user.imageUrl"
            class="c-home__header-avatar"
            alt="Avatar"
            :src="user.imageUrl"
          />
          <i v-else class="pgi pgi-user c-home__header-avatar--icon"></i>
        </router-link>
      </div>

      <div class="c-home__content d-flex">
        <div class="c-home__content-establishments fill-w">
          <!-- ------ Sugestões ------ -->
          <div v-if="!loadingSuggestions">
            <div
              v-if="suggestions && suggestions.length > 0"
              class="c-content c-home__content-establishments-suggestions"
            >
              <h4 class="c-home__content-establishments-suggestions-title">
                Sugestões
              </h4>

              <div
                class="c-home__content-establishments-suggestions-content mt-4"
              >
                <div
                  :class="[
                    'c-home__content-establishments-suggestions-content-card',
                    { 'mb-4': index !== suggestions.length - 1 }
                  ]"
                  v-for="(establishment, index) in suggestions"
                  :key="establishment.id"
                >
                  <pg-establishment-card
                    :establishment="establishment"
                    @clickCard="onClickEstablishment(establishment)"
                  ></pg-establishment-card>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="c-loading--default mx-auto">
            <pg-loading></pg-loading>
          </div>

          <!-- ------ Melhores avaliadas ------ -->
          <div
            v-if="mostRateds && mostRateds.length > 0"
            class="c-content c-home__content-establishments-mostRateds mt-6"
          >
            <h4 class="c-home__content-establishments-mostRateds-title">
              Melhores avaliadas
            </h4>

            <div class="c-home__content-establishments-mostRateds-content mt-4">
              <div
                :class="[
                  'c-home__content-establishments-mostRateds-content-card',
                  { 'mb-4': index !== mostRateds.length - 1 }
                ]"
                v-for="(establishment, index) in mostRateds"
                :key="establishment.id"
              >
                <pg-establishment-card
                  :establishment="establishment"
                  @clickCard="onClickEstablishment(establishment)"
                ></pg-establishment-card>
              </div>
            </div>
          </div>
        </div>
        <div class="c-home__content-invoices fill-w">
          <!-- ------ Pedidos recentes ------ -->
          <div v-if="!loadingRecents">
            <div
              v-if="recents && recents.length > 0"
              class="c-content c-home__content-invoices-recents d-flex flex-col align-center"
            >
              <h4 class="c-home__content-invoices-recents-title fill-w">
                <i class="pgi pgi-invoice"></i>
                Meus pedidos
              </h4>

              <div class="c-home__content-invoices-recents-content mt-4 fill-w">
                <div
                  :class="[
                    'c-home__content-invoices-recents-content-card',
                    { 'mb-4': index !== recents.length - 1 }
                  ]"
                  v-for="(invoice, index) in recents"
                  :key="invoice.id"
                >
                  <pg-invoice-card
                    v-color="getColorOfInvoice(invoice)"
                    :invoice="invoice"
                    @clickInvoice="onClickInvoice($event)"
                  ></pg-invoice-card>
                </div>
              </div>

              <pg-button
                v-color="'primary'"
                class="mt-4 c-home__content-invoices-recents-action"
              >
                <span class="text--linkMedium"> Ver meus pedidos </span>
              </pg-button>
            </div>
          </div>

          <div v-else class="c-loading--default mx-auto">
            <pg-loading></pg-loading>
          </div>

          <!-- ------ Dicas ------ -->
          <div
            v-if="mostRateds && mostRateds.length > 0"
            class="c-content c-home__content-establishments-mostRateds mt-6"
          >
            <h4 class="c-home__content-establishments-mostRateds-title">
              Melhores avaliadas
            </h4>

            <div class="c-home__content-establishments-mostRateds-content mt-4">
              <div
                :class="[
                  'c-home__content-establishments-mostRateds-content-card',
                  { 'mb-4': index !== mostRateds.length - 1 }
                ]"
                v-for="(establishment, index) in mostRateds"
                :key="establishment.id"
              >
                <pg-establishment-card
                  :establishment="establishment"
                  @clickCard="onClickEstablishment(establishment)"
                ></pg-establishment-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </pg-container>
  </div>
</template>

<style lang="scss" scoped>
@import "@/lib/styles/mq.scss";
@import "@/lib/styles/typography.scss";

.c-home {
  transition: color, background, background-color 0.3s ease-in-out;
  height: 100vh;
  background: var(--theme-backgroundMedium);

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include mq($from: tablet-landscape) {
      display: none;
    }

    &-avatar {
      width: var(--spacing-7);
      height: var(--spacing-7);
      border-radius: var(--spacing-1);
      object-fit: cover;

      &--icon {
        font-size: $font-size-lg;

        border: 1px solid var(--theme-primary);
        color: var(--theme-primary);
        border-radius: 100%;
        width: var(--spacing-7);
        height: var(--spacing-7);
        display: flex !important;
        justify-content: center;
        align-items: center;
        padding-bottom: 3px;
      }
    }
  }

  &__content {
    flex-direction: row;
    margin-bottom: var(--spacing-16);

    @include mq($until: tablet-landscape) {
      flex-direction: column;
    }

    &-establishments {
      margin-right: var(--spacing-10);

      @include mq($until: tablet-landscape) {
        margin: 0;
      }

      &-suggestions {
        margin-top: 0;

        @include mq($until: tablet-landscape) {
          margin-top: var(--spacing-5);
        }
      }

      &-suggestions,
      &-mostRateds {
        color: var(--theme-neutralDarkest);

        > h4,
        > p {
          margin: 0;
        }

        > h4 {
          display: flex;
          align-items: center;

          @include mq($until: tablet-landscape) {
            font-size: $font-size-sm;
          }

          > i {
            @include font-size($font-size-md);

            margin-right: var(--spacing-2);
          }
        }
      }
    }

    &-invoices {
      color: var(--theme-neutralDarkest);

      &-recents {
        margin-top: 0;

        @include mq($until: tablet-landscape) {
          margin-top: var(--spacing-5);
        }

        > h4,
        > p {
          margin: 0;
        }

        > h4 {
          display: flex;
          align-items: center;

          @include mq($until: tablet-landscape) {
            font-size: $font-size-sm;
          }

          > i {
            @include font-size($font-size-md);

            margin-right: var(--spacing-2);
          }
        }

        &-action {
          width: auto;

          @include mq($until: tablet-landscape) {
            width: 100%;
          }
        }
      }
    }
  }

  &__invoices {
    width: 100%;
    margin-top: var(--spacing-6);

    @include mq($from: tablet-landscape) {
      width: 40%;
      margin-top: 0;
    }

    &-content {
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      padding: var(--spacing-1);

      @include mq($from: tablet-landscape) {
        flex-direction: column;
        overflow-x: unset;
      }

      &::-webkit-scrollbar {
        width: 1px;
        height: 3px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: var(--theme-loadingBackground);
        margin-top: 36px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: var(--theme-primary);
        border-radius: var(--spacing-1);
      }

      &-card {
        margin-right: var(--spacing-2);
        padding-right: var(--spacing-2);
        margin-bottom: var(--spacing-4);
        flex: 0 0 calc(var(--spacing-1) * 39);

        @include mq($from: tablet-landscape) {
          width: 100%;
          margin-right: 0;
          padding-right: 0;
          flex: 1;
        }
      }
    }
  }

  &__establishments {
    width: 100%;
    margin-right: 0;
    margin-top: var(--spacing-4);

    @include mq($from: tablet-landscape) {
      width: 55%;
      height: 100%;
      margin-right: var(--spacing-10);
      margin-top: 0;
    }

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      &-card {
        margin-bottom: var(--spacing-4);
        width: 100%;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
import { mapState } from "vuex";
import { Establishment, Invoice, PaymentStatus, User } from "../lib/models";

@Component({
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("invoice", ["recents"]),
    ...mapState("establishment", ["mostRateds"]),
    ...mapState("establishment", ["suggestions"])
  }
})
export default class PgHome extends Vue {
  public mostRateds!: Establishment[];
  public suggestions!: Establishment[];
  public recents!: Invoice[];
  public user!: User;

  public loadingSuggestions = false;
  public loadingRecents = false;

  async created() {
    if (!this.recents || this.recents?.length === 0) {
      this.loadingRecents = true;
      const recents = await this.$api.invoices.recents();
      this.$store.dispatch("invoice/set", { recents });
      this.loadingRecents = false;
    }

    // if (!this.mostRateds || this.mostRateds?.length === 0) {
    //   const mostRateds = await this.$api.establishments.mostRateds();
    //   this.$store.dispatch("establishment/set", { mostRateds });
    // }

    if (!this.suggestions || this.suggestions?.length === 0) {
      this.loadingSuggestions = true;
      const suggestions = await this.$api.establishments.suggestions();
      this.$store.dispatch("establishment/set", { suggestions });
      this.loadingSuggestions = false;
    }
  }

  public getColorOfInvoice(invoice: Invoice): string {
    if (invoice.paymentStatus === PaymentStatus.refused || invoice.isFee) {
      return "feedbackErrorMedium";
    }

    if (invoice.strictAccepted) {
      if (invoice.delivered) {
        return "feedbackSuccessMedium";
      } else {
        return "feedbackWarningMedium";
      }
    }

    return "pending";
  }

  public async onClickInvoice(invoice: Invoice): Promise<void> {
    await this.$store.dispatch("invoice/set", { active: invoice });
    await this.$router.push(`/pedidos/${invoice.id}`);
  }

  public async onClickEstablishment(
    establishment: Establishment
  ): Promise<Route> {
    await this.$store.dispatch("establishment/set", { establishment });

    return this.$router.replace(`/estabelecimento/${establishment.id}`);
  }
}
</script>
