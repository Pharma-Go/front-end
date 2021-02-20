import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export interface User {
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: any;
  phone: string;
  cards: [
    {
      card_id: string;
      method: any;
    }
  ];
  reviews: [];
}

export default {
  namespaced: true,
  state: {
    user: {} as User
  },
  mutations: {
    setUser(state: any, payload: User) {
      state.user = payload;
    }
  },
  actions: {
    setUser({ commit }: any, payload: User) {
      commit("setUser", payload);
    }
  },
  getters: {
    getUser(state: any): User {
      return state.user;
    }
  }
};
