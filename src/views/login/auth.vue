<template>
  <pg-container class="c-auth bg--background" light>
    <img
      class="c-auth__img"
      :src="require('../../assets/medicina.svg')"
      alt="Auth image"
    />

    <router-view class="c-auth__content fill-w"></router-view>
  </pg-container>
</template>

<style lang="scss">
@import "../../lib/styles/mq.scss";
@import "../../lib/styles/typography.scss";

.c-auth {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  height: 100%;

  @include mq($until: tablet-landscape) {
    flex-direction: column;
  }

  &__img {
    width: 100%;
    padding: var(--spacing-2);
    flex: 1;
  }

  &__content {
    flex: 1;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgAuth extends Vue {

}
</script>
