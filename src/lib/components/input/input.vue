<template>
  <div
    v-color="color"
    :class="[
      { 'pg-input--focused': isFocused },
      'pg-input',
      'text-left',
      'mb-2'
    ]"
  >
    <label class="pg-input__wrapper">
      <div class="pg-input__prepend">
        <slot name="prepend">
          <pg-icon class="ml-2">{{ prependIcon }}</pg-icon>
        </slot>
      </div>
      <span
        :class="[
          'pg-input__label',
          {
            'pg-input__label--top': isFocused || lazyValue,
            'ml-8': !(isFocused || lazyValue) && hasPrepend,
            'ml-2': !hasPrepend
          }
        ]"
        >{{ label }}</span
      >
      <input
        class="pg-input__control pl-2 text--foreground"
        :disabled="disabled"
        v-model="lazyValue"
        :type="type"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :autocomplete="autocomplete"
        @input="$emit('input', lazyValue)"
        @focus="onFocus"
        @blur="onBlur"
      />
    </label>

    <div
      v-if="
        !hideMessages &&
        !(hideEmptyErrors
          ? hideEmptyErrors && (!errors || errors.length === 0)
          : true)
      "
      class="pg-input__messages my-1"
    >
      <span
        class="pg-input__messages--error"
        v-if="errors && errors.length > 0"
        >{{ errors[0] }}</span
      >
      <span v-else-if="isFocused && hint" class="pg-input__messages--hint">
        {{ hint }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.pg-input {
  transition: all 0.3s ease-in-out;

  font-size: 0.85em;
  text-align: start;

  &__prepend {
    .pg-icon {
      font-size: 19px;
    }
  }

  &__control {
    width: 100%;
    font: inherit;
    line-height: inherit;
    display: block;
    align-self: stretch;
    border: none;
    outline: none;
    background: none;
  }

  &__wrapper {
    position: relative;

    display: flex;
    align-items: center;
    border-radius: var(--spacing-1);
    min-height: 52px;

    // TODO: adicionar no tema a cor do input
    box-shadow: 0 0 0 1px #7c7c7c;
  }

  &__label {
    position: absolute;
    display: block;
    transition-timing-function: ease-in-out;
    transition-duration: 0.21s;
    will-change: top, transform;
    transform-origin: 50% 100%;
    top: 50%;
    transform: translate(0, -50%);

    &--top {
      top: -12px;
      background: var(--theme-background);
      padding: 0 6px;
      transform: scale(0.809);
    }
  }

  &__messages {
    min-height: 1em;
    font-size: 0.809em;

    &--error {
      // TODO: adicionar no tema a cor de erro
      color: red;
    }
  }

  &--focused {
    .pg-input__wrapper {
      box-shadow: 0 0 0 2px var(--current-color);
    }

    .pg-input__prepend {
      .pg-icon {
        color: var(--current-color);
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class PgInput extends Vue {
  @Prop({ type: String, default: "primary" }) public color!: string;
  @Prop({ type: Array, default: () => [] }) public errors!: string[];
  @Prop([Number, String]) public min!: number | string;
  @Prop([Number, String]) public max!: number | string;
  @Prop(String) public value!: string;
  @Prop(String) public placeholder!: string;
  @Prop(String) public autocomplete!: string;
  @Prop(String) public type!: string;
  @Prop(String) public label!: string;
  @Prop(String) public hint!: string;
  @Prop(String) public prependIcon!: string;
  @Prop(Boolean) public hideMessages!: boolean;
  @Prop({ type: Boolean, default: true }) public hideEmptyErrors!: boolean;
  @Prop({ type: Boolean, default: false }) public disabled!: boolean;

  public isFocused = false;
  public lazyValue = "";

  @Watch("value", { immediate: true })
  public onValueChange(value: string) {
    this.lazyValue = value;
  }

  private onFocus(): void {
    this.isFocused = true;
    this.$emit("focus");
  }

  private onBlur(): void {
    this.isFocused = false;
    this.$emit("blur");
  }

  get hasPrepend(): boolean {
    return !!(this.prependIcon || this.$slots.prepend);
  }
}
</script>
