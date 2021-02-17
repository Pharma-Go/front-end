import { DirectiveOptions, VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";
import Vue from "vue";

type ElColor = HTMLElement & { __color?: string };

function unbind(el: ElColor) {
  const value = el.__color && String(el.__color);
  if (!value) return;
  el.classList.remove(`var--${value}`);
  el.style.removeProperty("--current-color");
  el.__color = undefined;
}

function update(el: ElColor, binding: DirectiveBinding, vnode: VNode) {
  const value = binding.value && String(binding.value);
  const instance = vnode.context;
  if (value !== el.__color) {
    unbind(el);
    el.__color = value;
  }
  if (!value) return;
  const className = `var--${value}`;
  const prop = "--current-color";

  Vue.nextTick(() => {
    if (instance && value in instance.$pharmago.themeColors) {
      if (!el.classList.contains(className)) {
        el.classList.add(className);
      }
      return;
    }
    if (!el.style.getPropertyValue(prop)) {
      el.style.setProperty(prop, value);
    }
  });
}

function bind(el: ElColor, binding: DirectiveBinding, vnode: VNode) {
  const value = binding.value && String(binding.value);
  if (value) update(el, binding, vnode);
}

export const Color: DirectiveOptions = {
  bind,
  update
};