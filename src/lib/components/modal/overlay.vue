<template>
  <div class="c-overlay" @click.prevent="onClick"></div>
</template>

<style lang="scss">
.c-overlay {
  background: var(--theme-overlay);
  position: absolute;
  left: 0;
  right: 0;
  min-height: 100vh;
  cursor: pointer;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgOverlay extends Vue {
  public onClick(): void {
    this.$emit("clickOverlay");
  }
}
</script>
