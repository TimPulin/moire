import { createStore } from 'vuex';
// import axios from 'axios';
// import API_BASE_URL from '@/config';

// const axiosInstans = axios.create({
//   baseURL: API_BASE_URL,
// });

export default createStore({
  state: {
    cartItemAmount: 0,
  },
  getters: {},
  mutations: {
    updateCartItemAmount(amount) {
      this.cartItemAmount = amount;
    },
  },
  actions: {},
  modules: {},
});
