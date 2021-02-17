import { ObjectOptions } from "./root/PharmaGO.ui";
import { Theme } from "./root/theme-manager";

declare module "vue/types/vue" {
  interface Vue {
    $pharmago: ObjectOptions & { themeColors: Theme };
  }
}

export { PharmaGoUI as default } from "./plugin";
