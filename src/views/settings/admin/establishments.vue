<template>
  <pg-settings class="c-establishments" title="Estabelecimentos">
    <div v-if="establishments && establishments.length > 0">
      <div
        v-for="establishment in establishments"
        :key="establishment.id"
        class="mb-4"
      >
        <pg-establishment-card
          :establishment="establishment"
          :route="`estabelecimentos/${establishment.id}`"
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
      @include font-size($font-lg);
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
    ...mapState("establishment", ["establishments"])
  }
})
export default class PgAdminEstablishments extends Vue {
  public establishments!: Establishment[];

  public async created(): Promise<void> {
    if (!this.establishments || this.establishments?.length === 0) {
      const establishments = await this.$api.establishments.get();
      this.$store.dispatch("establishment/set", { establishments });
    }
  }
}
</script>
