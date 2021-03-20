<template>
  <div :class="['c-sidebar', { 'c-sidebar--opened': opened }]">
    <div
      @click.prevent="opened = !opened"
      class="c-sidebar__expand bg--contrast d-flex align-center justify-center radius--100"
    >
      <i
        :class="[
          'c-sidebar__expand-icon',
          'pgi',
          'pgi-chevron-left',
          'text--primary'
        ]"
      ></i>
    </div>

    <div :class="['c-sidebar__user', { 'c-sidebar__user--opened': opened }]">
      <img
        :src="user.imageUrl"
        class="c-sidebar__user-image"
        v-if="user && user.imageUrl"
      />
      <i v-else class="c-sidebar__user-avatar text--contrast pgi, pgi-user"></i>

      <div class="c-sidebar__user-info">
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
          class="c-sidebar__navigation-item-icon c-sidebar__navigation-home--icon pgi pgi-home"
        ></i>

        <p
          class="c-sidebar__navigation-item-text c-sidebar__navigation-home--text"
        >
          Início
        </p>
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
          class="c-sidebar__navigation-item-icon c-sidebar__navigation-search--icon pgi pgi-search"
        ></i>
        <p
          class="c-sidebar__navigation-item-text c-sidebar__navigation-search--text"
        >
          Buscar
        </p>
      </router-link>

      <div
        :class="['c-sidebar__navigation-cart', 'c-sidebar__navigation-item']"
      >
        <i
          class="c-sidebar__navigation-item-icon c-sidebar__navigation-cart--icon pgi pgi-cart"
        ></i>
        <p
          class="c-sidebar__navigation-item-text c-sidebar__navigation-cart--text"
        >
          Carrinho
        </p>
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
          class="c-sidebar__navigation-item-icon c-sidebar__navigation-favorite--icon pgi pgi-favorite"
        ></i>
        <p
          class="c-sidebar__navigation-item-text c-sidebar__navigation-favorite--text"
        >
          Favoritos
        </p>
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
          class="c-sidebar__navigation-item-icon c-sidebar__navigation-settings--icon pgi pgi-settings"
        ></i>
        <p
          class="c-sidebar__navigation-item-text c-sidebar__navigation-settings--text"
        >
          Configurações
        </p>
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
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--spacing-2) var(--spacing-3);
  position: sticky;
  top: 0;

  &:hover {
    .c-sidebar__expand {
      opacity: 1;
    }
  }

  &--opened {
    width: calc(var(--spacing-1) * 45);

    .c-sidebar__expand {
      padding-left: 0;
      padding-right: 2px;
    }

    .c-sidebar__expand-icon {
      transform: unset;
    }

    .c-sidebar__user {
      background: #4d93fc80;
      border-radius: var(--spacing-1);
      padding-left: var(--spacing-2);
    }

    .c-sidebar__user-avatar,
    .c-sidebar__user-image {
      margin-right: var(--spacing-2);
    }

    .c-sidebar__user-image {
      width: var(--spacing-9);
      height: var(--spacing-9);
    }

    .c-sidebar__user-info {
      opacity: 1;
    }

    .c-sidebar__navigation-item-text {
      opacity: 1;
    }

    .c-sidebar__navigation-item-icon {
      margin-right: var(--spacing-2);
    }
  }

  &__expand {
    box-shadow: var(--theme-shadowLevel1);

    width: var(--spacing-6);
    height: var(--spacing-6);
    padding-left: 2px;
    padding-right: 0;
    position: absolute;
    right: -15px;
    top: 90px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease-in-out;

    &-icon {
      transition: all 0.3s ease-in-out;
      transform: rotate(-180deg);
    }
  }

  &__user {
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
    padding: var(--spacing-2);
    padding-left: 0;

    &-avatar,
    &-image {
      transition: all 0.3s ease-in-out;
      margin-right: 0;
    }

    &-image {
      width: var(--spacing-9);
      height: var(--spacing-9);
      border-radius: var(--spacing-1);
    }

    &-avatar {
      @include font-size($font-size-sm);
    }

    &-info {
      transition: all 0.3s ease-in-out;
      opacity: 0;

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
      transition: all 0.3s ease-in-out;
      background: unset;
      height: var(--spacing-9);

      &-icon {
        transition: margin-right 0.3s ease-in-out;
        margin-right: 0;
      }

      &--active,
      &:hover {
        background: #4d93fc80;
        border-radius: var(--spacing-1);
        padding: var(--spacing-2);
      }

      &-text {
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
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
