<template>
  <div :class="[themeClass, 'c-bottom-bar']">
    <router-link
      to="/home"
      :class="[
        'c-bottom-bar__item',
        { 'c-bottom-bar__item-active': isActive('Home') }
      ]"
    >
      <i :class="['pgi', 'pgi-home']"></i>
    </router-link>
    <router-link
      to="/buscar"
      :class="[
        'c-bottom-bar__item',
        { 'c-bottom-bar__item-active': isActive('Buscar') }
      ]"
    >
      <i :class="['pgi', 'pgi-search']"></i>
    </router-link>
    <div :class="['c-bottom-bar__item']" @click.prevent="openBottomSheet">
      <i :class="['pgi', 'pgi-cart']"></i>
    </div>
    <router-link
      to="/favoritos"
      :class="[
        'c-bottom-bar__item',
        { 'c-bottom-bar__item-active': isActive('Favoritos') }
      ]"
    >
      <i :class="['pgi', 'pgi-favorite']"></i>
    </router-link>
    <router-link
      to="/configuracoes"
      :class="[
        'c-bottom-bar__item',
        { 'c-bottom-bar__item-active': isActive('Configuracoes') }
      ]"
    >
      <i :class="['pgi', 'pgi-settings']"></i>
    </router-link>

    <pg-bottom-sheet :show="showBottomSheet" @close="onCloseBottomSheet">
      <pg-cart-bottom-sheet
        v-if="showCartBottomSheet"
        @close="onCloseBottomSheet"
        @cleanupCart="onCleanupCart"
        @generateInvoice="onGenerateInvoice"
      ></pg-cart-bottom-sheet>
      <pg-confirmation-bottom-sheet
        v-if="showConfirmationBottomSheet && generatedInvoice"
        :invoice="generatedInvoice"
        :user="user"
      ></pg-confirmation-bottom-sheet>
    </pg-bottom-sheet>
  </div>
</template>

<style lang="scss">
@import "../../styles/depth.scss";
@import "../../styles/typography.scss";

.c-bottom-bar {
  background-color: var(--theme-navigationBarBackground);

  box-shadow: var(--theme-shadowLevel1);
  transition: all 0.3s ease-in-out;
  position: absolute;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  max-width: 100%;
  width: calc(100% - var(--spacing-7));
  padding: var(--spacing-2);

  left: 50%;
  bottom: var(--spacing-6);

  transform: translateX(-50%);
  border-radius: var(--spacing-3);

  &__item {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    width: var(--spacing-6);
    height: var(--spacing-6);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--spacing-1);

    > i {
      font-size: $font-size-sm;

      transition: all 0.3s ease-in-out;
      color: #fff;
    }

    &-active {
      background: var(--theme-navigationBarItem);

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<script lang="ts">
import { Themeable } from "@/lib/mixins";
import { Invoice } from "@/lib/models";
import { Component, Mixins, Prop } from "vue-property-decorator";

@Component
export default class PgBottomBar extends Mixins(Themeable) {
  @Prop(String)
  public activeRoute!: string;
  public showBottomSheet = false;
  public showCartBottomSheet = false;
  public showConfirmationBottomSheet = false;
  public generatedInvoice: Invoice = {} as Invoice;

  public isActive(routeName: string): boolean {
    return this.activeRoute === routeName;
  }

  public onCloseBottomSheet(): void {
    this.showBottomSheet = false;
  }

  public async onCleanupCart(): Promise<void> {
    await this.$store.dispatch("cart/clean");
  }

  public async onGenerateInvoice(invoice: Invoice): Promise<void> {
    this.showBottomSheet = false;
    this.showCartBottomSheet = false;

    if (!this.generatedInvoice.id) {
      this.generatedInvoice = await this.$api.invoices.getOne(invoice.id);
    }

    await this.$store.dispatch("cart/clean");

    setTimeout(() => {
      this.showConfirmationBottomSheet = true;
      this.showBottomSheet = true;
    }, 500);
  }

  public openBottomSheet() {
    this.showBottomSheet = true;
    this.showCartBottomSheet = true;
  }
}
</script>
