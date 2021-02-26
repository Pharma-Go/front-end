<template>
  <pg-container class="bg--background c-search">
    <h1 class="mb-4">Descobrir</h1>

    <pg-input
      :hideMessages="true"
      prependIcon="search"
      type="text"
      label="Buscar"
      v-model="term"
      @input="search"
    />

    <div class="c-search__content">
      <div
        class="c-search__establishments mt-6"
        v-if="establishments && establishments.length > 0"
      >
        <div
          class="c-search__establishment mt-4"
          v-for="establishment in establishments"
          :key="establishment.id"
        >
          <pg-establishment-card
            :establishment="establishment"
            @clickCard="onClickEstablishment(establishment)"
            :route="`/estabelecimento/${establishment.id}`"
          ></pg-establishment-card>
        </div>
      </div>
      <div class="c-search__content-no-search" v-else>
        <i class="pgi pgi-search-big"></i>
        <p class="text--foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  </pg-container>
</template>

<style lang="scss">
.c-search {
  &__content {
    &-no-search {
      margin-top: var(--spacing-16);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      > i {
        font-size: 96px;
        margin-bottom: var(--spacing-4);
      }
    }
  }
}
</style>

<script lang="ts">
import { Establishment } from "@/lib/models";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapState } from "vuex";
import { debounce } from "@/lib/utils/debounce";

@Component({
  computed: {
    ...mapState("establishment", {
      establishments: "establishments"
    })
  }
})
export default class PgSearch extends Vue {
  public term = "";
  public establishments!: Establishment[];

  public search = debounce(400, async () => {
    const establishments = await this.searchEstablishments();
    this.$store.dispatch("establishment/set", { establishments });
  });

  public async searchEstablishments(): Promise<Establishment[]> {
    return this.$api.establishments.search(this.term);
  }

  public onClickEstablishment(establishment: Establishment): void {
    this.$store.dispatch("establishment/set", { establishment });

    this.$router.push(`/estabelecimento/${establishment.id}`);
  }
}
</script>
