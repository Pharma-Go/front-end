import Vue from "vue";
import App from "./App.vue";
import PharmaGoUI from "./lib";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./lib/styles/main.scss";
import "pharmago-icons-impacta/dist/PharmaGo-Icons.css";
import * as services from "./services/";
import "./vee-validate";
import VueSocketIO from "vue-socket.io";
import { formatPrice } from "./lib/pipes/price.pipe";
import { formatPaymentMethod } from "./lib/pipes/payment-method.pipe";
import { cardDigits } from "./lib/pipes/card.pipe";
import VueMask from "v-mask";
import { VueMaskFilter } from "v-mask";
import { formatPhone } from "./lib/pipes/phone.pipe";
import { baseUrl } from "./environment/environment";

declare module "vue/types/vue" {
  export interface Vue {
    $api: typeof services;
  }
}

Vue.config.productionTip = false;

Vue.use(PharmaGoUI);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: baseUrl
  })
);
Vue.use(VueMask);

Vue.filter("VMask", VueMaskFilter);
Vue.filter("formatPrice", formatPrice);
Vue.filter("formatPhone", formatPhone);
Vue.filter("formatPaymentMethod", formatPaymentMethod);
Vue.filter("cardDigits", cardDigits);

Vue.mixin({
  computed: {
    $api() {
      return services;
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
