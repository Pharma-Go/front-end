<template>
  <pg-app id="app">
    <div class="c-app__content">
      <pg-sidebar
        v-if="showSidebar"
        class="c-app__content-sidebar"
        :activeItem="$route.name"
        :user="user"
      ></pg-sidebar>
      <router-view class="c-app__content-router" />
    </div>

    <pg-bottom-bar
      class="c-app__bottom-bar"
      v-if="$route.meta.bottomBar"
      :activeRoute="$route.name"
    ></pg-bottom-bar>

    <pg-snackbar v-model="snackbar.visible" :color="snackbar.color">
      <i v-if="snackbar.icon" :class="['pgi', 'mr-3', snackbar.icon]"></i>
      {{ snackbar.text }}
    </pg-snackbar>
  </pg-app>
</template>

<style lang="scss" scoped>
@import "@/lib/styles/mq.scss";

.c-app {
  &__content {
    display: flex;

    &-router {
      width: 100%;
      max-width: 100%;
      overflow-x: scroll;
    }

    &-sidebar {
      display: flex;

      @include mq($until: tablet-landscape) {
        display: none;
      }
    }
  }

  &__bottom-bar {
    display: flex;

    @include mq($from: tablet-landscape) {
      display: none;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import { oauth } from "./services";
import { mapState } from "vuex";
import { Invoice, Role, User } from "./lib/models";

@Component({
  computed: {
    ...mapState("user", ["user"])
  }
})
export default class PgAppVue extends Vue {
  public $refs!: { myBottomSheet: any };
  public user: User;
  public showSidebar = false;

  public snackbar: any = {
    visible: false,
    color: "feedbackErrorMedium"
  };

  @Watch("user", { immediate: true })
  public watchUser(): void {
    console.log(this.user, "user");
    this.showSidebar = !!(this.user && this.user.id);
  }

  public async created() {
    if (await oauth.isAuthenticated()) {
      if (!this.user.id) {
        const user = await this.$api.users.getOne("me");
        this.$pharmago.theme.themes.isDark = user.isDark;
      }
    }

    this.sockets.subscribe("strictAccept", (invoice: Invoice) => {
      if (this.$route.name !== "Invoice") {
        if (invoice.strictAccepted) {
          this.snackbar = {
            color: "feedbackSuccessMedium",
            icon: "pgi-added",
            text: `Sua(s) receita(s) foi(foram) aceita(s) do pedido #${invoice.id.substring(
              0,
              5
            )} `,
            visible: true
          };
        } else {
          this.snackbar = {
            color: "feedbackErrorMedium",
            icon: "pgi-close",
            text: `Sua(s) receita(s) foi(foram) recusada(s) do pedido #${invoice.id.substring(
              0,
              5
            )} `,
            visible: true
          };
        }
      }
    });

    this.sockets.subscribe("delivererAccept", (id: string) => {
      this.snackbar = {
        color: "feedbackSuccessMedium",
        icon: "pgi-added",
        text: `Seu pedido #${id.substring(0, 5)} está saindo para entrega ;)`,
        visible: true
      };
    });

    this.sockets.subscribe("newInvoice", (id: string) => {
      if (this.user.role !== Role.DEFAULT) {
        this.snackbar = {
          color: "feedbackSuccessMedium",
          icon: "pgi-added",
          text: `Novo pedido #${id.substring(0, 5)}!`,
          visible: true
        };
      }
    });
  }

  public beforeDestroy(): void {
    this.sockets.unsubscribe("newInvoice");
    this.sockets.unsubscribe("strictAccept");
    this.sockets.unsubscribe("delivererAccept");
  }

  public click(): void {
    this.$refs.myBottomSheet.open();

    // this.$socket.emit("newInvoice", "a");
  }
}
</script>
