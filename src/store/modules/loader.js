import mutations from '@/store/mutations';

const { TOGGLE_LOADER } = mutations;

const loaderStore = {
  state: {
    isLoading: false
  },
  getters: {
    isLoading: ({ isLoading }) => isLoading
  },
  mutations: {
    [TOGGLE_LOADER](state, bool) {
      state.isLoading = bool;
    }
  },
  actions: {
    toggleLoader({ commit }, bool) {
      commit(TOGGLE_LOADER, bool);
    }
  }
};

export default loaderStore;
