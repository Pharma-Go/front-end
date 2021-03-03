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
    connection: "https://pharmago-backend.herokuapp.com/"
  })
);

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
