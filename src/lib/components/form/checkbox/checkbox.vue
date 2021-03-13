<template>
  <label class="c-checkbox">
    {{ title }}
    <input
      :class="['c-checkbox__input', { 'c-checkbox__input--checked': checked }]"
      @click.prevent="onClick"
      v-model="checked"
      ref="checkbox"
      type="checkbox"
    />
    <span class="c-checkbox__mark"></span>
  </label>
</template>

<style lang="scss">
.c-checkbox {
  display: block;
  position: relative;
  padding-left: var(--spacing-6);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding-top: 2px;
  transition: all 0.3s ease-in-out;

  &__input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  &__mark {
    position: absolute;
    top: 0;
    left: 0;
    height: var(--spacing-4);
    width: var(--spacing-4);
    border-radius: var(--spacing-1);
    background-color: var(--theme-contrast);
    border: 1px solid var(--theme-primary);
    transition: all 0.3s ease-in-out;

    &::after {
      content: "";
      position: absolute;
      display: none;
    }
  }

  &__input--checked ~ &__mark {
    background-color: var(--theme-primary);
  }

  &__input--checked ~ &__mark:after {
    display: block;
  }
}

.c-checkbox .c-checkbox__mark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid var(--theme-contrast);
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PgCheckbox extends Vue {
  @Prop(String) public title: string;
  @Prop(Boolean) public checked: boolean;

  public onClick() {
    this.$emit("check");
  }
}
</script>
