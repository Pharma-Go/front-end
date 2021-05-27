<template>
  <component :is="tag" :to="to" class="c-item-list">
    <p class="c-item-list__text text--neutralDarkest">{{ title }}</p>
    <pg-icon
      :class="[
        'c-item-list__icon',
        'text--primary500',
        'ml-2',
        { 'c-item-list__icon--rotate': shouldRotate }
      ]"
      >{{ icon }}</pg-icon
    >
  </component>
</template>

<style lang="scss">
.c-item-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-3);
  align-items: center;
  cursor: pointer;

  &__text {
    margin: 0;
  }

  &__icon {
    &--rotate {
      transform: rotate(180deg);
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgItemList extends Vue {
  @Prop({ type: String, default: "router-link" }) public tag!: string;
  @Prop(String) public to!: string;
  @Prop(String) public icon!: string;
  @Prop(String) public title!: string;
  @Prop(Boolean) public shouldRotate!: boolean;
}
</script>
