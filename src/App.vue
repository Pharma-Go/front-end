<template>
  <pg-app id="app">
    <router-view />

    <pg-bottom-bar
      v-if="$route.meta.bottomBar"
      :activeRoute="$route.name"
    ></pg-bottom-bar>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>
  </pg-app>
</template>

<style lang="scss">
.bottom-sheet {
  &__card {
    background: var(--theme-background) !important;
  }

  &__bar {
    background: var(--theme-foreground) !important;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { oauth } from "./services";
import { mapState } from "vuex";
import { User } from "./lib/models";

@Component({
  computed: {
    ...mapState("user", ["user"])
  }
})
export default class PgAppVue extends Vue {
  public $refs!: { myBottomSheet: any };
  public user: User;

  public snackbar: any = {
    visible: false,
    color: "error"
  };

  public async created() {
    if (await oauth.isAuthenticated()) {
      if (!this.user.id) {
        const user = await this.$api.users.getOne("me");
        this.$pharmago.theme.themes.isDark = user.isDark;
      }
    }
    // this.sockets.subscribe("newInvoice", data => {
    //   console.log(data);
    //   this.snackbar = {
    //     color: "success",
    //     icon: "pgi-added",
    //     text: data,
    //     visible: true
    //   };
    // });
  }

  public beforeDestroy(): void {
    this.sockets.unsubscribe("newInvoice");
  }

  public click(): void {
    this.$refs.myBottomSheet.open();

    // this.$socket.emit("newInvoice", "a");
  }
}
</script>
