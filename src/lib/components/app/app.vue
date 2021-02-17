<template>
  <div :class="[themeClass, 'pg-app']">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.pg-app {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  transition: color, background 0.5s ease-in-out;
}
</style>

<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import { Themeable } from "../../mixins";

@Component
export default class PgApp extends Mixins(Themeable) {
  @Prop({ type: String, default: "button" })
  public tag!: string;
}
</script>
