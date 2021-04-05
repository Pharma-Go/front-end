<template>
  <div
    :class="[
      themeClass,
      'pg-container',
      { 'py-5': hasVerticalPadding },
      { 'pg-container--fluid': fluid },
      { 'px-4': hasHorizontalPadding }
    ]"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">
.pg-container {
  width: 100%;
  height: 100%;
  max-width: 1500px;
  margin: 0 auto;
  color: var(--theme-foreground);
  transition: color, background, background-color 0.3s ease-in-out;

  &--fluid {
    max-width: 100%;
  }
}
</style>

<script lang="ts">
import { Themeable } from "@/lib/mixins";
import { Component, Mixins, Prop } from "vue-property-decorator";

@Component
export default class PgContainer extends Mixins(Themeable) {
  @Prop(Boolean) public fluid!: boolean;
  @Prop({ type: Boolean, default: true }) public hasHorizontalPadding!: boolean;
  @Prop({ type: Boolean, default: true }) public hasVerticalPadding!: boolean;
}
</script>
