<template>
  <pg-teleport>
    <transition name="bottom-sheet-transition">
      <div class="c-bottom-sheet" v-if="show">
        <pg-overlay @clickOverlay="onClose"></pg-overlay>
        <div class="c-bottom-sheet__content" :style="{ height: height }">
          <slot></slot>
        </div>
      </div>
    </transition>
  </pg-teleport>
</template>

<style lang="scss">
.c-bottom-sheet {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &__content {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: var(--theme-background);
    border-top-left-radius: var(--spacing-4);
    border-top-right-radius: var(--spacing-4);
    overflow: auto;

    &::-webkit-scrollbar {
      width: 3px;
      height: 1px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: var(--theme-loadingBackground);
      margin-top: 36px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--theme-primary);
      border-radius: var(--spacing-1);
    }
  }
}

.bottom-sheet-transition {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease-in-out;
  }

  &-enter,
  &-leave-to {
    bottom: -100vh;
    opacity: 0;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgBottomSheet extends Vue {
  @Prop(Boolean) public show: boolean;
  @Prop({ type: String, default: "80vh" }) public height: string;

  public mounted() {
    document.onkeypress = event => {
      if (event.key === "Escape") {
        this.$emit("close");
      }
    };
  }

  public onClose() {
    this.$emit("close");
  }
}
</script>
