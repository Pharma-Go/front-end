<template>
  <div @click.prevent="onClick" ref="select" class="c-select">
    <div class="c-select__label">
      <p
        :class="[
          'c-select__label-text',
          'mb-0',
          'text--small',
          activeItem && activeItem.name
            ? 'text--foreground'
            : 'text--foregroundTertiary'
        ]"
      >
        {{ activeItem && activeItem.name ? activeItem.name : label }}
      </p>
      <i
        :class="[
          'c-select__label-icon',
          'pgi',
          'pgi-chevron-left',
          'text--small',
          { 'c-select__label-icon--opened': show }
        ]"
      ></i>
    </div>
    <pg-teleport>
      <transition name="select-transition">
        <div
          v-if="show && items && items.length > 0"
          class="c-select__items"
          :style="style"
        >
          <pg-item-select
            v-for="item in items"
            :key="item.value"
            :item="item"
            :active="item.value === activeItem.value"
            @select="onSelect($event)"
          ></pg-item-select>
        </div>
      </transition>
    </pg-teleport>
  </div>
</template>

<style lang="scss">
.c-select {
  display: flex;
  width: 100%;
  padding: var(--spacing-2);
  border: 1px solid #7c7c7c;
  border-radius: var(--spacing-1);
  align-items: center;
  min-height: 52px;
  cursor: pointer;

  &__label {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    &-icon {
      transition: transform 0.3s ease-in-out;
      transform: rotate(-90deg);

      &--opened {
        transform: rotate(90deg);
      }
    }
  }

  &__items {
    position: absolute;
    background-color: var(--theme-background);
    border: 1px solid #7c7c7c;
    border-bottom-left-radius: var(--spacing-1);
    border-bottom-right-radius: var(--spacing-1);

    > .c-item-select {
      border-bottom: 1px solid #7c7c7c;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.select-transition {
  &-enter-active,
  &-leave-active {
    transition: all 0.25s ease-in-out;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>

<script lang="ts">
import { SelectItem } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgSelect extends Vue {
  @Prop() public items: SelectItem[];
  @Prop() public activeItem: SelectItem;
  @Prop({ type: String, default: "Selecionar" }) public label: string;

  public $refs: { select: any };
  public show = false;
  public style = {};

  public onClick(): void {
    const el = this.$refs.select;
    const rect = el.getBoundingClientRect();

    this.style = {
      left: rect.left + "px",
      top: rect.top + rect.height - 6 + "px",
      width: rect.width + "px"
    };

    this.show = !this.show;
  }

  public onSelect(item): void {
    this.$emit("select", item);
    this.show = false;
  }
}
</script>
