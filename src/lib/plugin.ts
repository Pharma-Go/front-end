import { PluginObject } from "vue/types/umd";
import { createObject } from "./root/PharmaGO.ui";
import { ThemeList, ThemeManager } from "./root/theme-manager";
import * as components from "./components/index";
import * as directives from "./directives/index";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

export interface PluginOptions {
  themes: ThemeList;
  icons: { prefix: string };
}

export const PharmaGoUI: PluginObject<PluginOptions> = {
  install(vue, options) {
    for (const [name, directive] of Object.entries(directives)) {
      vue.directive(name, directive);
    }

    const config = createObject(vue as any, {
      theme: new ThemeManager(options?.themes),
      icons: options?.icons ?? { prefix: "pgi" }
    });

    vue.prototype.$pharmago = config;
    vue.prototype.$dayjs = dayjs;

    for (const [name, component] of Object.entries(components)) {
      vue.component(name, component);
    }
  }
};
