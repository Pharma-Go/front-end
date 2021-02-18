<template>
  <component
    v-on="$listeners"
    :type="type"
    :is="tag"
    :class="[themeClass, 'pg-btn', 'px-5', 'py-2']"
  >
    <span class="text--normal text--bold"><slot> </slot></span>
  </component>
</template>

<style lang="scss">
.pg-btn {
  background: var(--current-color);
  border-radius: 33px;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>

<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import { Themeable } from "../../mixins/";

@Component
export default class PgButton extends Mixins(Themeable) {
  @Prop({ type: String, default: "button" }) public tag!: string;
  @Prop(String) public type!: string;
}
</script>
