<template>
  <pg-settings
    class="c-establishments"
    title="Estabelecimentos"
    :canBack="true"
    backUrl="/configuracoes/"
  >
    <div v-if="myEstablishments && myEstablishments.length > 0">
      <div
        v-for="establishment in myEstablishments"
        :key="establishment.id"
        class="mb-4"
      >
        <pg-establishment-card
          :establishment="establishment"
          @clickCard="onClickEstablishment"
        ></pg-establishment-card>
      </div>
    </div>

    <router-link to="estabelecimentos/criar" class="c-establishments__add">
      <i class="pgi pgi-add text--primary mb-1"></i>
      <p class="text--primary">Adicionar estabelecimento</p>
    </router-link>
  </pg-settings>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-establishments {
  &__add {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 0 auto;
    width: calc(var(--spacing-1) * 32);
    height: calc(var(--spacing-1) * 23);
    background: var(--theme-secondaryBackground);
    border-radius: var(--spacing-2);

    > i {
      @include font-size($font-size-lg);
    }

    > p {
      text-align: center;
    }
  }
}
</style>

<script lang="ts">
import { Establishment } from "@/lib/models";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("establishment", ["myEstablishments"])
  }
})
export default class PgAdminEstablishments extends Vue {
  public myEstablishments!: Establishment[];

  public async created(): Promise<void> {
    if (!this.myEstablishments || this.myEstablishments?.length === 0) {
      const myEstablishments = await this.$api.establishments.getMy();
      this.$store.dispatch("establishment/set", { myEstablishments });
    }
  }

  public async onClickEstablishment(
    establishment: Establishment
  ): Promise<void> {
    await this.$store.dispatch("establishment/set", { active: establishment });
    await this.$router.push(`estabelecimentos/${establishment.id}`);
  }
}
</script>
