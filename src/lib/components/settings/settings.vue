<template>
  <pg-container
    class="bg--backgroundSettings c-settings"
    :hasHorizontalPadding="false"
    :hasVerticalPadding="false"
  >
    <div class="c-settings__header">
      <div class="c-settings__header-content">
        <div
          @click.prevent="onBack"
          v-if="canBack"
          class="c-settings__header-content-icon-container bg--secondaryBackground"
        >
          <i
            class="c-settings__header-content-icon pgi pgi-chevron-left text--primary500"
          ></i>
        </div>
        <h1 class="c-settings__header-title text--neutralDarkest text--md">
          {{ title }}
        </h1>
      </div>

      <div class="c-settings__header-logout" @click.prevent="logout">
        <p class="c-settings__header-logout-text text--xxxs text--primary500">
          Sair
        </p>
        <i
          class="c-settings__header-logout-icon pgi pgi-logout text--primary500"
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
  height: 100vh;
  background: var(--theme-backgroundMedium);

  @include mq($until: tablet-landscape) {
    height: auto;
    min-height: 100vh;
  }

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-7);
    padding: 0 var(--spacing-4);
    transition: all 0.3s ease-in-out;

    &-content {
      display: flex;
      align-items: center;

      &-icon {
        font-size: $font-size-xs;

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
        font-size: $font-size-sm;
      }
    }

    &-title {
      @include font-size($font-size-sm - 1);

      white-space: break-spaces;
      word-break: break-all;
    }
  }

  &__content {
    width: 100%;
    border-top-left-radius: var(--spacing-4);
    border-top-right-radius: var(--spacing-4);
    padding: var(--spacing-4) var(--spacing-4) var(--spacing-16)
      var(--spacing-4);
    height: 100vh;
    transition: all 0.3s ease-in-out;

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

  public async logout(): Promise<void> {
    this.$api.oauth.options.storage.clear();
    // await this.$store.
    this.$router.replace("/");
  }

  public onBack(): void {
    this.$router.replace(this.backUrl);
  }
}
</script>
