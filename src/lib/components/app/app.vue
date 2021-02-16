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
  }
</style>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import {Themeable} from '../../mixins';

  @Component
  export default class PgApp extends Mixins(Themeable) {
    @Prop({type: String, default: 'button'})
    public tag!: string;
  }
</script>