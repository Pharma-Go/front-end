<template>
  <div
    @mouseenter="showExpand = !showExpand"
    @mouseleave="showExpand = !showExpand"
    :class="['c-sidebar', { 'c-sidebar--opened': opened }]"
  >
    <transition name="sidebar-transition">
      <div
        @click.prevent="opened = !opened"
        v-if="showExpand"
        :class="[
          'c-sidebar__expand',
          'bg--contrast',
          'd-flex align-center',
          'justify-center',
          'radius--100',
          { 'c-sidebar__expand--opened': opened }
        ]"
      >
        <i
          :class="[
            'c-sidebar__expand-icon',
            'pgi',
            'pgi-chevron-left',
            'text--primary',
            { 'rotate--negative-180': !opened }
          ]"
        ></i>
      </div>
    </transition>
    <div :class="['c-sidebar__user', { 'c-sidebar__user--opened': opened }]">
      <img
        :src="user.imageUrl"
        :class="['c-sidebar__user-image', { 'mr-2': opened }]"
        v-if="user && user.imageUrl"
      />
      <i
        v-else
        :class="[
          'c-sidebar__user-avatar',
          'text--contrast',
          'pgi',
          'pgi-user',
          { 'mr-2': opened }
        ]"
      ></i>

      <transition name="sidebar-transition">
        <div class="c-sidebar__user-info" v-if="opened">
          <h2
            v-if="user && user.name"
            class="c-sidebar__user-info-name text--small text--contrast"
          >
            {{ user.name }}
          </h2>
          <p
            v-if="user && user.phone"
            class="c-sidebar__user-info-cellphone text--small text--contrast mb-0"
          >
            {{ user.phone | formatPhone }}
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
            { 'mr-2': opened }
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
            { 'mr-2': opened }
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
            { 'mr-2': opened }
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
            { 'mr-2': opened }
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
            { 'mr-2': opened }
          ]"
        ></i>
        <transition name="sidebar-transition">
          <p v-if="opened" class="c-sidebar__navigation-settings--text">
            Configurações
          </p>
        </transition>
      </router-link>
    </div>

    <div
      class="c-sidebar__logout d-flex align-center cursor--pointer fill-w pa-2"
      @click.prevent="logout"
    >
      <i class="pgi pgi-logout text--contrast mr-2"></i>
      <transition name="sidebar-transition">
        <p v-if="opened" class="mb-0 text--contrast">Sair</p>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/lib/styles/typography.scss";
@import "@/lib/styles/depth.scss";

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
  position: sticky;
  top: 0;

  &__expand {
    @include z-depth($level: 1, $omni: true);

    width: var(--spacing-6);
    height: var(--spacing-6);
    padding-left: 2px;
    padding-right: 0;
    position: absolute;
    right: -15px;
    top: 90px;
    cursor: pointer;

    &--opened {
      padding-left: 0;
      padding-right: 2px;
    }

    &-icon {
      transition: all 0.3s ease-in-out;
    }
  }

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

    &-image {
      width: var(--spacing-8);
      height: var(--spacing-8);
      border-radius: var(--spacing-1);
    }

    &-avatar {
      @include font-size($font-size-sm);
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

  &__logout {
    > p {
      margin: 0;
      @include font-size($font-size-xs);
    }

    > i {
      @include font-size($font-size-sm);
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
  public showExpand = false;

  public isActive(routeName: string): boolean {
    return this.activeItem === routeName;
  }

  public async logout(): Promise<void> {
    this.$api.oauth.options.storage.clear();
    // await this.$store.
    this.$router.replace("/");
  }
}
</script>
