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

    <button @click.prevent="click">abrir</button>

    <vue-bottom-sheet
      maxHeight="90%"
      :maxWidth="null"
      :rounded="true"
      ref="myBottomSheet"
    >
      <div class="c-bottom-sheet">
        <h1>Lorem Ipsum</h1>
        <h2>What is Lorem Ipsum?</h2>
        <p style="margin: 0">
          <strong>Lorem Ipsum</strong> is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p style="margin: 0">
          <strong>Lorem Ipsum</strong> is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p style="margin: 0">
          <strong>Lorem Ipsum</strong> is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </vue-bottom-sheet>
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
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";

@Component({
  components: {
    VueBottomSheet
  }
})
export default class PgAppVue extends Vue {
  public $refs!: { myBottomSheet: any };

  public snackbar: any = {
    visible: false,
    color: "error"
  };

  public created(): void {
    this.sockets.subscribe("newInvoice", data => {
      console.log(data);
      this.snackbar = {
        color: "success",
        icon: "pgi-added",
        text: data,
        visible: true
      };
    });
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
