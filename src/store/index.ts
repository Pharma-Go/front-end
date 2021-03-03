import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import invoice from "./invoice";
import establishment from "./establishment";
import category from "./category";
import card from "./card";
import bff from "./bff";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, invoice, establishment, category, card, bff }
});
