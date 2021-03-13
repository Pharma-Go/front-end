<template>
  <div class="c-item-select" v-if="item" @click.prevent="onClick">
    <p
      :class="[
        'c-item-select__name',
        'mb-0',
        'text--small',
        { 'text--bold': active },
        { 'text--primary': active }
      ]"
    >
      {{ item.name }}
    </p>
  </div>
</template>

<style lang="scss">
.c-item-select {
  padding: var(--spacing-1) var(--spacing-2);
  cursor: pointer;
}
</style>

<script lang="ts">
import { SelectItem } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgItemSelect extends Vue {
  @Prop() public item: SelectItem;
  @Prop() public active: boolean;

  public onClick(): void {
    this.$emit("select", this.item);
  }
}
</script>
