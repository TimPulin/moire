<template>
  <BasePreloaderSmall
    :productsIsLoading="productsIsLoading"
    :productsLoadFault="productsLoadFault"
  />

  <div v-if="pageIsLoaded" class="content__top">
    <BaseBreadcrumbs
      :arr-sections="[
        { routeName: 'cart', slug: '', title: 'Корзина' },
        { title: 'Заказ' },
      ]"
    />

    <div class="content__row">
      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order.id }}</span>
      </h1>
    </div>
  </div>

  <section v-if="pageIsLoaded" class="cart">
    <form v-if="orderIsLoaded" class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <p class="cart__message">
          Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
          письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
          в&nbsp;течение часа для уточнения деталей доставки.
        </p>

        <CartUserInfoList :user="order" />
      </div>

      <CartOrderList
        :items="order.basket.items"
        :deliveryPrice="order.deliveryType.price"
      />
    </form>

    <form v-else class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <p class="cart__message">Заказ не найден</p>
      </div>
    </form>
  </section>
</template>

<script>
import axiosInstance from '@/helpers/axios-instance';
import BaseBreadcrumbs from '@/components/base/BaseBreadcrumbs.vue';
import CartUserInfoList from '@/components/cart/CartUserInfoList.vue';
import CartOrderList from '@/components/cart/CartOrderList.vue';
import { mapState } from 'vuex';
export default {
  components: { BaseBreadcrumbs, CartUserInfoList, CartOrderList },
  data() {
    return {
      order: {},
      pageIsLoaded: true,
      orderIsLoaded: true,
      // orderId: 2679,
    };
  },
  computed: {
    ...mapState({
      user: 'user',
      orderId: 'currentOrderId',
    }),
  },
  created() {
    this.loadOrder();
  },
  methods: {
    loadOrder() {
      this.pageIsLoaded = false;
      this.orderIsLoaded = false;
      return axiosInstance
        .get(`/orders/${this.orderId}`, {
          params: {
            userAccessKey: this.user.accessKey,
          },
        })
        .then((response) => {
          console.log(response);
          this.order = response.data;
          this.orderIsLoaded = true;
        })
        .catch((error) => {
          (this.user = {}), (this.orderId = ''), console.log(error);
          this.orderIsLoaded = false;
        })
        .finally(() => {
          this.pageIsLoaded = true;
        });
    },
  },
};
</script>
