export const mutations = {
  SET(state: any, payload: any) {
    Object.assign(state, payload);
  },
  CLEAN(state: any) {
    state.user = null;
  }
};
