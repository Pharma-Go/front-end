import {Component, Watch} from 'vue-property-decorator';
import Vue from 'vue/types/umd';
import { ThemeManager } from './theme-manager';


export interface ObjectOptions {
  theme: ThemeManager;
  icons: {prefix: string};
  
}

export function createObject(vue: typeof Vue, obj: ObjectOptions): ObjectOptions {
  @Component
  class Config extends Vue implements ObjectOptions {
    public theme = obj.theme;
    public icons = obj.icons;

    @Watch('theme.themes.light', {deep: true})
    @Watch('theme.themes.dark', {deep: true, immediate: true})
    public onThemeChange() {
      this.theme.register();
    }

    get themeColors() {
      return (this.theme.themes.isDark ? this.theme.themes.dark : this.theme.themes.light) ?? {};
    }
  }

  return new Config();
}