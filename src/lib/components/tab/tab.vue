<template>
  <div
    class="c-tabs"
    v-if="activeCategoryId && categories && categories.length > 0"
  >
    <div :class="['c-tabs__tabs', { 'fill-w': !canCreateCategory }]">
      <p
        v-for="category in categories"
        :key="category.id"
        @click.prevent="onClickCategory(category.id)"
        :class="[
          'c-tabs__tabs-tab',
          { 'text--bold text--primary': category.id === activeCategoryId }
        ]"
      >
        {{ category.name }}
      </p>
    </div>

    <div
      class="c-tabs__icon bg--secondaryBackground"
      title="Adicionar categoria"
      v-if="canCreateCategory"
      @click.prevent="onCreateCategory"
    >
      <i class="c-tabs__icon-content pgi pgi-add text--primary"></i>
    </div>
  </div>
</template>

<style lang="scss">
.c-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--spacing-5);

  &__tabs {
    display: flex;
    height: 100%;
    overflow-x: scroll;
    width: 85%;

    &::-webkit-scrollbar {
      width: 1px;
      height: 1px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--theme-primary);
      border-radius: var(--spacing-1);
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
      background: var(--theme-primary);
      border-radius: var(--spacing-1);
    }

    &-tab {
      white-space: nowrap;
      margin: 0 9px;
      cursor: pointer;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    height: var(--spacing-5);
    width: var(--spacing-5);
    cursor: pointer;
  }
}
</style>

<script lang="ts">
import { Category } from "@/lib/models";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgTab extends Vue {
  @Prop() public categories!: Category[];
  @Prop(String) public activeCategoryId!: string;
  @Prop(Boolean) public canCreateCategory!: boolean;

  public onCreateCategory(): void {
    this.$emit("createCategory");
  }

  public onClickCategory(id: string): void {
    this.$emit("clickCategory", id);
  }
}
</script>
