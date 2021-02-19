import { ObjectOptions } from "./root/PharmaGO.ui";
import { Theme } from "./root/theme-manager";
import dayjs from "dayjs";

declare module "vue/types/vue" {
  interface Vue {
    $pharmago: ObjectOptions & { themeColors: Theme };
    $dayjs(
      date?: dayjs.ConfigType,
      option?: dayjs.OptionType,
      locale?: string
    ): dayjs.Dayjs;
  }
}

export { PharmaGoUI as default } from "./plugin";
