<template>
  <pg-container class="c-establishment bg--background">
    <button @click="logout">aaaa</button>
  </pg-container>
</template>

<style lang="scss">
.c-establishment {
  height: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class PgEstablishment extends Vue {
  public created() {
    console.log(this.$route.params);
  }

  public logout() {
    this.$api.oauth.options.storage.clear();
  }
}
</script>
