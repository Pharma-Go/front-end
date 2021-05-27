<template>
  <div :class="['c-sidebar', { 'c-sidebar--opened': opened }]">
    <div
      @click.prevent="opened = !opened"
      class="c-sidebar__expand d-flex align-center justify-center radius--100"
    >
      <i
        :class="[
          'c-sidebar__expand-icon',
          'pgi',
          'pgi-chevron-left',
          'text--primary500500'
        ]"
      ></i>
    </div>

    <div :class="['c-sidebar__user', { 'c-sidebar__user--opened': opened }]">
      <img
        :src="user.imageUrl"
        class="c-sidebar__user-image"
        v-if="user && user.imageUrl"
      />
      <i v-else class="c-sidebar__user-avatar pgi, pgi-user"></i>

      <div class="c-sidebar__user-info">
        <h2
          v-if="user && user.name"
          class="c-sidebar__user-info-name text--xxxs"
        >
          {{ user.name }}
        </h2>
        <p
          v-if="user && user.phone"
          class="c-sidebar__user-info-cellphone text--xxxs mb-0"
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
        @click.prevent="showBottomSheet = true"
        :class="[
          'cursor--pointer',
          'c-sidebar__navigation-cart',
          'c-sidebar__navigation-item',
          { 'c-sidebar__navigation-item--active': isActive('Cart') }
        ]"
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
      class="c-sidebar__logout d-flex align-center cursor--pointer fill-w"
      @click.prevent="logout"
    >
      <i class="pgi pgi-logout mr-2"></i>
      <transition name="sidebar-transition">
        <p v-if="opened" class="mb-0">Sair</p>
      </transition>
    </div>

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
@import "@/lib/styles/typography.scss";
@import "@/lib/styles/depth.scss";

.c-sidebar {
  width: calc(var(--spacing-10) + var(--spacing-5));
  height: 100vh;
  background-color: var(--theme-navigationBarBackground);
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
      background: var(--theme-navigationBarItem);
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
    background: var(--theme-backgroundMedium);

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
    overflow: hidden;
    color: #ffffff;

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
      font-size: $font-size-sm;
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
    overflow: hidden;

    &-item {
      display: flex;
      align-items: center;
      margin: var(--spacing-3) 0;
      color: #ffffff;
      padding: var(--spacing-2) var(--spacing-2) var(--spacing-2) 14px;
      transition: all 0.3s ease-in-out;
      background: unset;
      height: var(--spacing-9);

      &-icon {
        transition: margin-right 0.3s ease-in-out;
        margin-right: 0;
      }

      &--active,
      &:hover {
        background: var(--theme-navigationBarItem);
        border-radius: var(--spacing-1);
      }

      &-text {
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
      }

      > p {
        margin: 0;
        font-size: $font-size-xs;
      }

      > i {
        font-size: $font-size-sm;
      }
    }
  }

  &__logout {
    overflow: hidden;
    padding: var(--spacing-2) var(--spacing-2) var(--spacing-2) 14px;
    color: #ffffff;
    border-radius: var(--spacing-1);
    transition: background 0.3s ease-in-out;

    &:hover {
      background: var(--theme-navigationBarItem);
    }

    > p {
      margin: 0;
      font-size: $font-size-xs;
    }

    > i {
      font-size: $font-size-sm;
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

  public showBottomSheet = false;
  public showCartBottomSheet = false;
  public showConfirmationBottomSheet = false;
  public opened = false;

  public isActive(routeName: string): boolean {
    return this.activeItem === routeName;
  }

  public async logout(): Promise<void> {
    this.$api.oauth.options.storage.clear();
    await this.$store.dispatch("user/clean");
    // await this.$store.
    this.$router.replace("/");
  }

  public onCloseBottomSheet(): void {
    this.showBottomSheet = false;
  }

  public async onCleanupCart(): Promise<void> {
    await this.$store.dispatch("cart/clean");
  }
}
</script>
