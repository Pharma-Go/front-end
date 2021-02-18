import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import * as locale from "vee-validate/dist/locale/pt_BR.json";
import Vue from "vue";

for (const [name, rule] of Object.entries(rules)) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  extend(name, { ...rule, message: locale.messages[name as any] });
}

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
