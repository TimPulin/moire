<template>
  <SiteHeader />
  <main class="content container" v-if="pageIsLoaded">
    <router-view />
  </main>
  <SiteFooter />
</template>

<script>
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
} from '@/helpers/local-storage-connection';
import calcCartItemAmount from '@/helpers/calc-cart-item-amount';
import axiosInstance from './helpers/axios-instance';

import { mapMutations } from 'vuex';

import SiteHeader from '@/components/site/SiteHeader.vue';
import SiteFooter from './components/site/SiteFooter.vue';

export default (await import('vue')).defineComponent({
  components: {
    SiteHeader,
    SiteFooter,
  },
  data() {
    return {
      pageIsLoaded: true,
    };
  },
  created() {
    this.setUser();
  },
  computed: {},
  methods: {
    ...mapMutations({
      setUserToState: 'setUser',
      updateCartItemAmount: 'updateCartItemAmount',
    }),
    async setUser() {
      this.pageIsLoaded = false;
      const user = getUserFromLocalStorage();

      if (user) {
        const data = await this.getCart(user.accessKey);
        const amount = calcCartItemAmount(data.items);
        this.setUserToState(user);
        this.updateCartItemAmount(amount);
      } else {
        const data = await this.getCart();
        setUserToLocalStorage(data.user);
        this.setUserToState(data.user);
        this.updateCartItemAmount(0);
      }
      this.pageIsLoaded = true;
    },
    getCart(accessKey = '') {
      return axiosInstance
        .get('/baskets', {
          params: {
            userAccessKey: accessKey,
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
