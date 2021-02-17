<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <pre>{{ $pharmago.theme }}</pre>
    <input v-model="$pharmago.theme.themes.isDark" type="checkbox" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class PgHome extends Vue {
  public title = "Olá!";
}
</script>
