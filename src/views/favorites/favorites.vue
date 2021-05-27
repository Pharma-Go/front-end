<template>
  <pg-container class="bg--background c-favorites">
    <h1 class="mb-4 text--md text--neutralDarkest">Favoritos</h1>

    <pg-tab-result
      @changeCategory="onChangeCategory($event)"
      :activeCategory="activeCategory"
    >
      <template v-slot:content>
        <div class="c-favorites__content">
          <div v-if="activeCategory === 'pharmacies'">
            <div
              v-if="
                user.favoriteEstablishments &&
                user.favoriteEstablishments.length > 0
              "
              class="o-grid"
            >
              <div
                class="o-grid__cell u-8/16@tablet-landscape mt-4"
                v-for="establishment in user.favoriteEstablishments"
                :key="establishment.id"
              >
                <pg-establishment-card
                  :establishment="establishment"
                  @clickCard="onClickEstablishment(establishment.id)"
                ></pg-establishment-card>
              </div>
            </div>
            <div class="c-favorites__content-no-favorites" v-else>
              <i class="pgi pgi-favorites-big"></i>
              <p class="text--neutralDarkest">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          <div v-else>
            <div
              v-if="
                user.favoriteProducts.products &&
                user.favoriteProducts.products.length > 0
              "
              class="o-grid"
            >
              <div
                class="o-grid__cell u-8/16@tablet-landscape mt-4"
                v-for="product in user.favoriteProducts.products"
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
            <div class="c-favorites__content-no-favorites" v-else>
              <i class="pgi pgi-favorites-big"></i>
              <p class="text--neutralDarkest">
                Não há nenhum produto favoritado :(
                <br />
                <router-link to="/search" class="text--bold">
                  Venha descobrir produtos do seu interesse!</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </template>
    </pg-tab-result>
  </pg-container>
</template>

<style lang="scss">
@import "@/lib/styles/mq.scss";

.c-favorites {
  width: 100%;
  height: 100vh;
  background: var(--theme-backgroundMedium);

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
  }

  &__content {
    &-no-favorites {
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
import { User } from "@/lib/models";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: {
    ...mapState("user", ["user"])
  }
})
export default class PgFavorites extends Vue {
  public user!: User;
  public activeCategory = "pharmacies";

  public onChangeCategory(category: string): void {
    this.activeCategory = category;
  }

  public async onClickEstablishment(id: string): Promise<void> {
    const establishment = await this.$api.establishments.getOne(id);
    await this.$store.dispatch("establishment/set", { active: establishment });
    console.log(establishment);

    this.$router.push(`/estabelecimento/${establishment.id}`);
  }

  public onClickProduct(): void {
    console.log("oioioi");
  }
}
</script>
