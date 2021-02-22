<template>
  <pg-app id="app">
    <router-view />

    <pg-bottom-bar
      v-if="$route.meta.bottomBar"
      :activeRoute="$route.name"
    ></pg-bottom-bar>
  </pg-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PgApp extends Vue {
  public async created(): Promise<void> {
    // if (await this.$api.oauth.isAuthenticated()) {
    //   const user = await this.$api.users.getOne("me");
    //   this.$store.dispatch("user/set", { user });
    // }
  }
}
</script>
