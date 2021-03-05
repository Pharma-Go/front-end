import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import invoice from "./invoice";
import establishment from "./establishment";
import category from "./category";
import card from "./card";
import bff from "./bff";
import cart from "./cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, invoice, establishment, category, card, bff, cart }
});
