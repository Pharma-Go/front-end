<template>
  <div v-if="card && card.id" class="c-profile-card__card text--bold">
    <p class="c-profile-card__card-name text--contrast">
      {{ card.holderName }}
    </p>

    <div class="c-profile-card__card-footer">
      <p class="c-profile-card__card-footer-text text--contrast mb-1">
        {{ getCardDigits() }}
      </p>
      <div class="c-profile-card__card-footer-informations text--contrast">
        <p class="c-profile-card__card-footer-informations-val mr-2">
          VAL: {{ getCardVal() }}
        </p>
        <p class="c-profile-card__card-footer-informations-cvv">CVV: ***</p>
      </div>
    </div>
  </div>
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
import { Card } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgProfileCard extends Vue {
  @Prop() public card: Card;

  public getCardDigits(): string {
    let cardNumber = "";

    if (this.card) {
      if (this.card.firstDigits) {
        cardNumber = this.card.firstDigits.substring(0, 4);
        cardNumber += "  ";
        cardNumber += this.card.firstDigits.substring(4, 6);
      }

      cardNumber += "** ****";

      if (this.card.lastDigits) {
        cardNumber += this.card.lastDigits;
      }
    }

    return cardNumber;
  }

  public getCardVal(): string {
    let expirationDate = "";

    if (this.card && this.card.expirationDate) {
      expirationDate = this.card.expirationDate.substring(0, 2);
      expirationDate += "/";
      expirationDate += this.card.expirationDate.substring(2, 4);
    }

    return expirationDate;
  }
}
</script>
