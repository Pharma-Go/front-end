export const actions = {
  set({ commit }: any, payload: any) {
    commit("SET", payload);
  },
  clean({ commit }: any) {
    commit("CLEAN");
  }
};
