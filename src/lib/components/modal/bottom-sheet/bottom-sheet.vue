<template>
  <transition name="bottom-sheet-transition">
    <pg-teleport v-if="show">
      <div class="c-bottom-sheet">
        <pg-overlay @clickOverlay="onClose"></pg-overlay>
        <div class="c-bottom-sheet__content" :style="{ height: height }">
          <slot></slot>
        </div>
      </div>
    </pg-teleport>
  </transition>
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
    height: 70vh;
    bottom: 0;
    background: white;
    border-top-left-radius: var(--spacing-4);
    border-top-right-radius: var(--spacing-4);
  }
}

.bottom-sheet-transition {
  &-enter-active,
  &-leave-active {
    transition: all 0.15s ease-in-out;
  }

  &-enter,
  &-leave-to {
    bottom: 1em;
    opacity: 0;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgBottomSheet extends Vue {
  @Prop(Boolean) public show: boolean;
  @Prop({ type: String, default: "70vh" }) public height: string;

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
