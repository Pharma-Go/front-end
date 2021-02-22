<template>
  <div :class="[themeClass, 'bg--backgroundBottomBar', 'c-bottom-bar']">
    <router-link
      to="/home"
      :class="[
        'c-bottom-bar__item',
        { 'c-bottom-bar__item-active': isActive('Home') }
      ]"
    >
      <i
        :class="[{ 'text--primary': isActive('Home') }, 'pgi', 'pgi-home']"
      ></i>
    </router-link>
    <router-link
      to="/buscar"
      :class="[
        'c-bottom-bar__item',
        { 'c-bottom-bar__item-active': isActive('Search') }
      ]"
    >
      <i
        :class="[{ 'text--primary': isActive('Search') }, 'pgi', 'pgi-search']"
      ></i>
    </router-link>
    <div :class="['c-bottom-bar__item']">
      <i :class="['pgi', 'pgi-cart']"></i>
    </div>
    <router-link
      to="/favoritos"
      :class="[
        'c-bottom-bar__item',
        { 'c-bottom-bar__item-active': isActive('Favorites') }
      ]"
    >
      <i
        :class="[
          { 'text--primary': isActive('Favorites') },
          'pgi',
          'pgi-favorite'
        ]"
      ></i>
    </router-link>
    <router-link
      to="/configuracoes"
      :class="[
        'c-bottom-bar__item',
        { 'c-bottom-bar__item-active': isActive('Settings') }
      ]"
    >
      <i
        :class="[
          { 'text--primary': isActive('Settings') },
          'pgi',
          'pgi-settings'
        ]"
      ></i>
    </router-link>
  </div>
</template>

<style lang="scss">
@import "../../styles/depth.scss";
@import "../../styles/typography.scss";

.c-bottom-bar {
  @include z-depth($level: 2, $omni: true);

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

    > i {
      @include font-size($global-delta-size);

      color: #fff;
    }

    &-active {
      background: var(--theme-background);
      border-radius: 100%;
      width: var(--spacing-6);
      height: var(--spacing-6);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<script lang="ts">
import { Themeable } from "@/lib/mixins";
import { Component, Mixins, Prop } from "vue-property-decorator";

@Component
export default class PgBottomBar extends Mixins(Themeable) {
  @Prop(String)
  public activeRoute!: string;

  public isActive(routeName: string): boolean {
    return this.activeRoute === routeName;
  }
}
</script>
