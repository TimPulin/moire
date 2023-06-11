import { createStore } from 'vuex';
// import axiosInstance from '@/helpers/axios-instance';

export default createStore({
  state: {
    cartItemAmount: 0,
    user: {},
    accessKey: '',
  },
  mutations: {
    updateCartItemAmount(state, amount) {
      state.cartItemAmount = amount;
    },
    setUser(state, user) {
      state.user = Object.assign({}, user);
    },
    setAccessKey(state, value) {
      state.accessKey = value;
    },
  },
  // getters: {},
  // actions: {},
  // modules: {},
});
