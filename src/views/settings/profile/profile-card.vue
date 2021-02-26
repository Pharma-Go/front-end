<template>
  <pg-settings
    :title="title"
    :canBack="true"
    backUrl="/configuracoes/cartoes"
    class="c-profile-card"
  >
    <div v-if="!isLoading">
      <div v-if="card && card.id" class="c-profile-card__card text--bold">
        <p class="c-profile-card__card-name">{{ card.holder_name }}</p>

        <div class="c-profile-card__card-footer">
          <p class="c-profile-card__card-footer-text text--contrast mb-1">
            {{ getCardDigits() }}
          </p>
          <div class="c-profile-card__card-footer-informations">
            <p class="c-profile-card__card-footer-informations-val mr-2">
              VAL: {{ getCardVal() }}
            </p>
            <p class="c-profile-card__card-footer-informations-cvv">CVV: ***</p>
          </div>
        </div>
      </div>

      <form v-else @submit.prevent="onSubmit" class="c-profile__form">
        <div class="c-profile__form-field">
          <pg-input
            label="Nome"
            prependIcon="user"
            v-model="form.card_holder_name"
          ></pg-input>
        </div>
        <div class="c-profile__form-field my-4">
          <pg-input
            label="Número"
            prependIcon="wallet"
            v-model="form.card_number"
          ></pg-input>
        </div>
        <div class="c-profile__form-field my-4">
          <pg-input
            label="Validade"
            prependIcon="email"
            v-model="form.card_expiration_date"
          ></pg-input>
        </div>
        <div class="c-profile__form-field my-4">
          <pg-input
            label="CVV"
            prependIcon="email"
            v-model="form.card_cvv"
          ></pg-input>
        </div>
        <pg-button
          class="mt-4 fill-w"
          v-color="'backgroundButton'"
          type="submit"
        >
          <span class="text--contrast"> Salvar </span>
        </pg-button>
      </form>
    </div>
  </pg-settings>
</template>

<style lang="scss">
.c-profile-card {
  &__card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--spacing-2);
    max-width: calc(var(--spacing-1) * 48);
    min-height: calc(var(--spacing-1) * 28);
    margin: 0 auto;
    background: var(--theme-backgroundGradient);

    &-footer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-text {
        margin: 0;
      }

      &-informations {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

<script lang="ts">
import { PagarmeCard } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgProfileCard extends Vue {
  public isLoading = false;
  public form = {
    card_holder_name: "",
    card_number: "",
    card_cvv: "",
    card_expiration_date: "",
    method: "CREDIT_CARD"
  };

  public card: PagarmeCard = {} as PagarmeCard;
  public title = "Criar";

  public async created(): Promise<void> {
    if (this.$route.params.card) {
      this.isLoading = true;

      const card: PagarmeCard = await this.$api.cards.getOne(
        this.$route.params.card
      );

      this.isLoading = false;
      this.card = card;
      this.title = "Cartão";
    }
  }

  public async onSubmit(): Promise<void> {
    await this.$api.cards.save(this.form);

    const cards = await this.$api.cards.getOne("me");

    this.$store.dispatch("card/set", { cards });
    this.$router.go(-1);
  }

  public getCardDigits(): string {
    return (
      `${this.card?.first_digits?.substring(
        0,
        4
      )} ${this.card?.first_digits?.substring(4, 6)}** **** ${
        this.card?.last_digits
      }` || ""
    );
  }

  public getCardVal(): string {
    return `${this.card?.expiration_date?.substring(
      0,
      2
    )}/${this.card?.expiration_date?.substring(2, 4)}`;
  }
}
</script>
