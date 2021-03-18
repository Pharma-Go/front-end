<template>
  <div :class="['c-sidebar', { 'c-sidebar--opened': opened }]">
    <div :class="['c-sidebar__user', { 'c-sidebar__user--opened': opened }]">
      <img
        :src="user.imageUrl"
        :class="['c-sidebar__user-image', { 'mr-1': opened }]"
        v-if="user && user.imageUrl"
      />
      <i
        v-else
        :class="[
          'c-sidebar__user-avatar',
          'text--contrast',
          'text--large',
          'pgi',
          'pgi-user',
          { 'mr-1': opened }
        ]"
      ></i>

      <transition name="sidebar-transition">
        <div class="c-sidebar__user-info" v-if="opened">
          <h2 class="c-sidebar__user-info-name text--small text--contrast">
            Vinícius Sousa dos Santos
          </h2>
          <p
            class="c-sidebar__user-info-cellphone text--small text--contrast mb-0"
          >
            (11) 98024-8668
          </p>
        </div>
      </transition>
    </div>

    <div class="c-sidebar__navigation">
      <router-link
        to="/home"
        :class="[
          'c-sidebar__navigation-home',
          'c-sidebar__navigation-item',
          { 'c-sidebar__navigation-item--active': isActive('Home') }
        ]"
      >
        <i
          :class="[
            'c-sidebar__navigation-home--icon',
            'pgi',
            'pgi-home',
            { 'mr-1': opened }
          ]"
        ></i>
        <transition name="sidebar-transition">
          <p v-if="opened" class="c-sidebar__navigation-home--text">Início</p>
        </transition>
      </router-link>

      <router-link
        to="/buscar"
        :class="[
          'c-sidebar__navigation-search',
          'c-sidebar__navigation-item',
          { 'c-sidebar__navigation-item--active': isActive('Search') }
        ]"
      >
        <i
          :class="[
            'c-sidebar__navigation-search--icon',
            'pgi',
            'pgi-search',
            { 'mr-1': opened }
          ]"
        ></i>
        <transition name="sidebar-transition">
          <p v-if="opened" class="c-sidebar__navigation-search--text">Buscar</p>
        </transition>
      </router-link>

      <div
        :class="['c-sidebar__navigation-cart', 'c-sidebar__navigation-item']"
      >
        <i
          :class="[
            'c-sidebar__navigation-cart--icon',
            'pgi',
            'pgi-cart',
            { 'mr-1': opened }
          ]"
        ></i>
        <transition name="sidebar-transition">
          <p v-if="opened" class="c-sidebar__navigation-cart--text">Carrinho</p>
        </transition>
      </div>

      <router-link
        to="/favoritos"
        :class="[
          'c-sidebar__navigation-favorite',
          'c-sidebar__navigation-item',
          { 'c-sidebar__navigation-item--active': isActive('Favorites') }
        ]"
      >
        <i
          :class="[
            'c-sidebar__navigation-favorite--icon',
            'pgi',
            'pgi-favorite',
            { 'mr-1': opened }
          ]"
        ></i>
        <transition name="sidebar-transition">
          <p v-if="opened" class="c-sidebar__navigation-favorite--text">
            Favoritos
          </p>
        </transition>
      </router-link>

      <router-link
        to="/configuracoes"
        :class="[
          'c-sidebar__navigation-settings',
          'c-sidebar__navigation-item',
          { 'c-sidebar__navigation-item--active': isActive('Settings') }
        ]"
      >
        <i
          :class="[
            'c-sidebar__navigation-settings--icon',
            'pgi',
            'pgi-settings',
            { 'mr-1': opened }
          ]"
        ></i>
        <transition name="sidebar-transition">
          <p v-if="opened" class="c-sidebar__navigation-settings--text">
            Configurações
          </p>
        </transition>
      </router-link>
    </div>

    <button @click.prevent="opened = !opened">aaaaaaaaa</button>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";

.c-sidebar {
  width: calc(var(--spacing-10) + var(--spacing-5));
  height: 100vh;
  background-color: var(--theme-primary);
  transition: width 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-6) var(--spacing-4);

  &--opened {
    width: calc(var(--spacing-1) * 45);
  }

  &__user {
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;

    &--opened {
      background: #4d93fc80;
      border-radius: var(--spacing-1);
      padding: var(--spacing-2);
    }

    &-info {
      &-name {
        width: 100%;
        white-space: nowrap;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(var(--spacing-1) * 20);
      }
    }
  }

  &__navigation {
    &-item {
      display: flex;
      align-items: center;
      margin: var(--spacing-3) 0;
      color: var(--theme-contrast);
      padding: var(--spacing-2);
      width: 100%;
      transition: all 0.3s ease-in-out;
      background: unset;

      &--active,
      &:hover {
        background: #4d93fc80;
        border-radius: var(--spacing-1);
        padding: var(--spacing-2);
      }

      > p {
        margin: 0;
        @include font-size($font-size-xs);
      }

      > i {
        @include font-size($font-size-sm);
      }
    }
  }
}

.sidebar-transition {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-in-out;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>

<script lang="ts">
import { User } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgSidebar extends Vue {
  @Prop() public user!: User;
  @Prop() public activeItem!: string;

  public opened = false;

  public isActive(routeName: string): boolean {
    return this.activeItem === routeName;
  }
}
</script>
