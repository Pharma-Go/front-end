<template>
  <div class="c-loading"></div>
</template>

<style lang="scss">
.c-loading {
  width: 100%;
  height: 100%;
  border: 3px solid var(--theme-loadingBackground);
  border-top-color: var(--theme-loadingBackgroundActive);
  border-radius: 100%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgLoading extends Vue {}
</script>
