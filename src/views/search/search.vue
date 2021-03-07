<template>
  <pg-container class="bg--background c-search">
    <h1 class="mb-4">Descobrir</h1>

    <pg-input
      :hideMessages="true"
      prependIcon="search"
      type="text"
      label="Buscar"
      v-model="term"
      @input="searchValue"
    />

    <pg-tab-result
      @changeCategory="onChangeCategory($event)"
      :activeCategory="activeCategory"
    >
      <template v-slot:content>
        <div class="c-search__content">
          <div v-if="activeCategory === 'pharmacies'">
            <div
              v-if="search.establishments && search.establishments.length > 0"
            >
              <div
                class="mt-4"
                v-for="establishment in search.establishments"
                :key="establishment.id"
              >
                <pg-establishment-card
                  :establishment="establishment"
                  @clickCard="onClickEstablishment(establishment)"
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
          <div v-else>
            <div v-if="search.products && search.products.length > 0">
              <div
                class="mt-4"
                v-for="product in search.products"
                :key="product.id"
              >
                <div @click.prevent="onClickProduct(product)">
                  <pg-establishment-product-card
                    :product="product"
                    :hasAddIcon="true"
                  ></pg-establishment-product-card>
                </div>
              </div>
            </div>
            <div class="c-search__content-no-search" v-else>
              <i class="pgi pgi-search-big"></i>
              <p class="text--foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </template>
    </pg-tab-result>
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
import { Establishment, Product, SearchResponse } from "@/lib/models";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapState } from "vuex";
import { debounce } from "@/lib/utils/debounce";
import { establishments } from "@/services";

@Component({
  computed: {
    ...mapState("bff", ["search"])
  }
})
export default class PgSearch extends Vue {
  public term = "";
  public search!: SearchResponse;
  public activeCategory = "pharmacies";
  public $refs!: { myBottomSheet: any };

  public searchValue = debounce(400, async () => {
    if (this.checkTermLength()) {
      const search = await this.searchValues();
      this.$store.dispatch("bff/set", { search });
    }
  });

  public checkTermLength(): boolean {
    return this.term && this.term.length >= 3;
  }

  public async searchValues(): Promise<SearchResponse> {
    return this.$api.bff.search(this.term);
  }

  public onChangeCategory(category: string): void {
    this.activeCategory = category;
  }

  public async onClickEstablishment(
    establishment: Establishment
  ): Promise<void> {
    await this.$store.dispatch("establishment/set", { active: establishment });
    console.log(establishment);

    this.$router.push(`/estabelecimento/${establishment.id}`);
  }

  public onClickProduct(): void {
    this.$refs.myBottomSheet.open();
    console.log("oioioi");
  }
}
</script>
