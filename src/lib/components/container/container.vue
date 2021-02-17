<template>
  <div :class="['pg-container', { 'pg-container--fluid': fluid }, 'px-4']">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.pg-container {
  width: 100%;
  height: 100%;
  max-width: 1500px;
  margin: 0 auto;

  &--fluid {
    max-width: 100%;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgContainer extends Vue {
  @Prop(Boolean) public fluid!: boolean;
}
</script>
