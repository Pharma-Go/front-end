<template>
  <transition name="snackbar-transition">
    <div v-if="visible" v-color="color" class="c-snackbar d-flex align-center">
      <slot></slot>
    </div>
  </transition>
</template>

<style lang="scss">
.c-snackbar {
  position: fixed;
  left: 50%;
  bottom: var(--spacing-8);
  display: flex;
  justify-content: center;
  background: var(--current-color);
  color: white;
  padding: var(--spacing-2) var(--spacing-4);
  width: calc(100% - var(--spacing-10));
  max-width: 100%;
  transform: translateX(-50%);
  border-radius: var(--spacing-1);
  z-index: 999;
}

.snackbar-transition {
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
import { Component, Model, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class PgInput extends Vue {
  @Prop({ type: String, default: "error" }) public color!: string;
  @Prop({ type: Number, default: 5000 }) public duration!: number;
  @Model()
  @Prop({ type: Boolean, default: true })
  public visible!: boolean;

  public timer: number | null = null;

  @Watch("visible")
  public onChange(): void {
    if (this.visible) {
      this.startTimer();
    }
  }

  public startTimer(): void {
    this.timer = setTimeout(() => {
      this.$emit("visible", false);
    }, this.duration);
  }
}
</script>
