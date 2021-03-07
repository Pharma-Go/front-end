<template>
  <pg-teleport>
    <transition name="dialog-transition">
      <div class="c-dialog" v-if="show">
        <pg-overlay @clickOverlay="onClose"></pg-overlay>
        <div class="c-dialog__content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </pg-teleport>
</template>

<style lang="scss">
.c-dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &__content {
    position: absolute;
    max-width: 90vw;
    max-height: 90vh;
    width: 100%;

    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: var(--theme-background);
    border-radius: var(--spacing-4);
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

.dialog-transition {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease-in-out;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgDialog extends Vue {
  @Prop(Boolean) public show: boolean;

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
