<template>
  <pg-settings
    title="Cartões"
    :canBack="true"
    backUrl="/configuracoes/"
    class="pt-5"
  >
    <div v-for="card in cards" :key="card.id">
      <pg-card
        :card="card"
        @delete="onDelete(card.id)"
        @card="onClickCard(card.card_id)"
      ></pg-card>
    </div>

    <router-link
      to="/configuracoes/cartoes/criar"
      class="c-profile-cards__action mt-4"
    >
      <i class="c-profile-cards__action-icon pgi pgi-add mr-2"></i>
      <p class="c-profile-cards__action-text text--medium text--bold">
        Adicionar cartão
      </p>
    </router-link>
  </pg-settings>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-profile-cards {
  &__action {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &-icon {
      font-size: $font-size-sm;
      color: var(--theme-primary);
    }

    &-text {
      color: var(--theme-primary);
      margin: 0;
    }
  }
}
</style>

<script lang="ts">
import { Card } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("card", ["cards"])
  }
})
export default class PgProfileCards extends Vue {
  public cards!: Card[];

  public async created(): Promise<void> {
    if (!this.cards || this.cards?.length === 0) {
      const cards = await this.$api.cards.getOne("me");

      this.$store.dispatch("card/set", { cards });
    }
  }

  public async delete(id: string): Promise<void> {
    await this.$api.cards.deleteOne(id);

    const cards = await this.$api.cards.getOne("me");
    this.$store.dispatch("card/set", { cards });
  }

  public onClickCard(card_id: string): void {
    this.$router.push(`/configuracoes/cartoes/${card_id}`);
  }
}
</script>
