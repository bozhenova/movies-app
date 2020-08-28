import mutations from '@/store/mutations';

const { SHOW_NOTIFICATION } = mutations;

const notificationStore = {
  state: {
    messagePool: []
  },
  getters: {
    messagePool: ({ messagePool }) => messagePool[messagePool.length - 1]
  },
  mutations: {
    [SHOW_NOTIFICATION](state, message) {
      state.messagePool.push(message);
    }
  },
  actions: {
    showNotification({ commit }, message) {
      commit(SHOW_NOTIFICATION, message);
    }
  }
};

export default notificationStore;
