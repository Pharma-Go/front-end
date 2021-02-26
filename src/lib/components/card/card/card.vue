<template>
  <div v-if="card" class="c-card">
    <div class="c-card__delete" @click.prevent="onDelete">
      <i class="c-card__delete-icon pgi pgi-trash text--primary"></i>
    </div>

    <div class="c-card__content ml-3" @click.prevent="onCard">
      <p class="c-card__content-text text--foreground">
        {{
          `${card.first_digits.substring(0, 4)} ${card.first_digits.substring(
            4,
            6
          )}** **** ${card.last_digits}`
        }}
      </p>
      <i class="c-card__content-icon pgi pgi-chevron-left text--primary"></i>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__delete {
    padding-bottom: var(--spacing-2);
    cursor: pointer;

    &-icon {
      @include font-size($font-sm);
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid var(--light-foregroundSecondary);
    padding-bottom: var(--spacing-2);
    cursor: pointer;

    &-text {
      margin: 0;
    }

    &-icon {
      transform: rotate(180deg);
    }
  }
}
</style>

<script lang="ts">
import { Card } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgCard extends Vue {
  @Prop() public card!: Card;

  public onDelete(): void {
    this.$emit("delete");
  }

  public onCard(): void {
    this.$emit("card");
  }
}
</script>
