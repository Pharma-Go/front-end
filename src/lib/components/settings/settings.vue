<template>
  <pg-container
    class="bg--backgroundSettings c-settings"
    :hasHorizontalPadding="false"
  >
    <div class="c-settings__header">
      <div class="c-settings__header-content">
        <div
          @click.prevent="onBack"
          v-if="canBack"
          class="c-settings__header-content-icon-container bg--secondaryBackground"
        >
          <i
            class="c-settings__header-content-icon pgi pgi-chevron-left text--primary"
          ></i>
        </div>
        <h1 class="c-settings__header-title text--foreground">{{ title }}</h1>
      </div>

      <div class="c-settings__header-logout" @click.prevent="logout">
        <p class="c-settings__header-logout-text text--small text--primary">
          Sair
        </p>
        <i
          class="c-settings__header-logout-icon pgi pgi-logout text--primary"
        ></i>
      </div>
    </div>

    <div class="c-settings__content bg--background">
      <slot></slot>
    </div>
  </pg-container>
</template>

<style lang="scss">
@import "../../styles/typography.scss";
@import "../../styles/mq.scss";

.c-settings {
  width: 100%;

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-7);
    padding: 0 var(--spacing-4);

    &-content {
      display: flex;
      align-items: center;

      &-icon {
        @include font-size($font-xs);

        &-container {
          margin-right: var(--spacing-1);
          margin-top: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
          padding: var(--spacing-1) var(--spacing-1) var(--spacing-1) 3px;
          cursor: pointer;
        }
      }
    }

    &-logout {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-left: var(--spacing-4);

      &-text {
        margin-bottom: 0;
        margin-right: var(--spacing-2);
      }

      &-icon {
        @include font-size($font-sm);
      }
    }

    &-title {
      white-space: break-spaces;
      word-break: break-all;
    }
  }

  &__content {
    width: 100%;
    border-top-left-radius: var(--spacing-4);
    border-top-right-radius: var(--spacing-4);
    padding: var(--spacing-4);
    height: 100vh;

    @include mq($until: tablet-landscape) {
      height: auto;
      min-height: 86vh;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgSettings extends Vue {
  @Prop(String) public title!: string;
  @Prop(String) public backUrl!: string;
  @Prop(Boolean) public canBack!: boolean;

  public logout(): void {
    this.$api.oauth.options.storage.clear();
    this.$router.replace("/");
  }

  public onBack(): void {
    this.$router.replace(this.backUrl);
  }
}
</script>
