<template>
  <pg-container class="bg--backgroundMedium c-search">
    <div class="c-content">
      <div class="c-search__search">
        <h1 class="mb-4 text--neutralDarkest text--md">Descobrir</h1>

        <pg-input
          class="c-search__search-field"
          :hideMessages="true"
          prependIcon="search"
          type="text"
          label="Buscar"
          v-model="term"
          @input="searchValue"
        />
      </div>

      <pg-tab-result
        @changeCategory="onChangeCategory($event)"
        :activeCategory="activeCategory"
        class="mt-5"
      >
        <template v-slot:content>
          <div class="c-search__content">
            <div v-if="activeCategory === 'pharmacies'">
              <div
                v-if="search.establishments && search.establishments.length > 0"
                class="o-grid"
              >
                <div
                  class="o-grid__cell u-8/16@tablet-landscape"
                  v-for="establishment in search.establishments"
                  :key="establishment.id"
                >
                  <pg-establishment-card
                    class="mt-4"
                    :establishment="establishment"
                    @clickCard="onClickEstablishment(establishment)"
                  ></pg-establishment-card>
                </div>
              </div>
              <div class="c-search__content-no-search" v-else>
                <i class="text--neutralDarkest pgi pgi-search-big"></i>
                <p class="text--neutralDarkest">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div v-else>
              <div v-if="search.products" class="o-grid mb-16">
                <div
                  class="mt-5 o-grid__cell"
                  v-for="entry of Object.entries(search.products)"
                  :key="entry[0]"
                >
                  <h2 class="text--neutralDarkest mb-3">{{ entry[0] }}</h2>

                  <div
                    class="d-inline-flex overflow-x max-fill-w"
                    v-for="product in entry[1]"
                    :key="product.id"
                  >
                    <div class="mr-4" @click.prevent="onClickProduct(product)">
                      <pg-product-card
                        class="c-search__content-products-item"
                        :product="product"
                        :hasAddIcon="true"
                      ></pg-product-card>
                    </div>
                  </div>
                </div>
              </div>
              <div class="c-search__content-no-search" v-else>
                <i class="text--neutralDarkest pgi pgi-search-big"></i>
                <p class="text--neutralDarkest">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        </template>
      </pg-tab-result>
    </div>
  </pg-container>
</template>

<style lang="scss">
@import "@/lib/styles/mq.scss";

.c-search {
  height: 100vh;

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
  }

  &__search {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @include mq($until: tablet-landscape) {
      flex-direction: column;
      align-items: flex-start;

      > h1 {
        margin-bottom: var(--spacing-4);
      }
    }

    &-field {
      width: 40%;

      > .pg-input__wrapper {
        border-radius: var(--spacing-6);
      }

      .pg-input__label--top {
        background: var(--theme-backgroundLight) !important;
      }

      @include mq($until: tablet-landscape) {
        width: 100%;
      }
    }
  }

  &__content {
    &-cards {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-item {
        width: 45%;

        @include mq($until: tablet-landscape) {
          width: 100%;
        }
        // &-card {
        // }
      }
    }

    &-products-item {
      background: var(--theme-backgroundMedium);

      @include mq($until: tablet-landscape) {
        background: var(--theme-backgroundLight);
      }
    }

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
import { Establishment, SearchResponse } from "@/lib/models";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapState } from "vuex";
import { debounce } from "@/lib/utils/debounce";

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
