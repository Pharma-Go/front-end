import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import invoice from "./invoice";
import establishment from "./establishment";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, invoice, establishment }
});
