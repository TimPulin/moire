<template>
  <BasePreloaderSmall
    :productsIsLoading="productsIsLoading"
    :productsLoadFault="productsLoadFault"
  />

  <div v-if="pageIsLoaded" class="content__top">
    <BaseBreadcrumbs :arr-sections="[{ title: 'Корзина' }]" />
    <div class="content__row">
      <h1 class="content__title">Корзина</h1>
      <span class="content__info">
        {{ cartItemAmount }} {{ productsAmountEnding }}
      </span>
    </div>
  </div>

  <section v-if="pageIsLoaded" class="cart">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <ul class="cart__list">
          <CartItem
            v-for="(product, index) in cart"
            :key="index"
            :product="product"
            @delete-product="deleteProduct"
            @change-product-amount="changeProductAmount"
          />
        </ul>
      </div>

      <div class="cart__block">
        <p class="cart__desc" v-if="cart.length > 0">
          Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
        </p>
        <p class="cart__price">
          Итого: <span> {{ renderCartPriceTotal }}</span>
        </p>

        <button
          v-if="cart.length > 0"
          class="cart__button button button--primery"
          @click.prevent="goToOrderMaking"
        >
          Оформить заказ
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import axiosInstance from '@/helpers/axios-instance';
import setProductsAmountEnding from '@/helpers/set-product-amount-ending';
import renderProductPrice from '@/helpers/render-product-price';

import getCartMixin from '@/mixins/get-cart';
import loadingProcessMixin from '@/mixins/loading-process';

import BaseBreadcrumbs from '@/components/base/BaseBreadcrumbs.vue';
import BasePreloaderSmall from '@/components/base/BasePreloaderSmall.vue';
import CartItem from '@/components/cart/CartItem.vue';

import { mapState } from 'vuex';

export default {
  components: { BaseBreadcrumbs, BasePreloaderSmall, CartItem },
  mixins: [getCartMixin, loadingProcessMixin],
  data() {
    return {
      pageIsLoaded: true,
      cart: [],
    };
  },
  computed: {
    ...mapState({
      cartItemAmount: 'cartItemAmount',
      user: 'user',
    }),
    productsAmountEnding() {
      return setProductsAmountEnding(this.cartItemAmount);
    },
    renderCartPriceTotal() {
      const cartPriceTotal = this.cart.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
      return renderProductPrice(cartPriceTotal);
      // TODO переименовать renderProductPrice в renderPrice везде
    },
  },
  created() {
    this.loaderPage(this.cart);
  },
  methods: {
    async loaderPage() {
      this.pageIsLoaded = false;
      const data = await this.getCart(this.$store.state.user.accessKey);
      this.cart = data.items;

      this.pageIsLoaded = true;
    },
    deleteProduct(productId) {
      return axiosInstance
        .delete('/baskets/products', {
          params: {
            userAccessKey: this.user.accessKey,
          },
          data: {
            basketItemId: productId,
          },
        })
        .then((response) => {
          this.cart = response.data.items;
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    changeProductAmount({ amount, id }) {
      if (amount === '') {
        console.log('пустое значение количества товара');
        return false;
      }
      return axiosInstance
        .put(
          '/baskets/products',

          {
            basketItemId: id,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: this.user.accessKey,
            },
          }
        )
        .then((response) => {
          this.cart = response.data.items;
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    goToOrderMaking() {
      this.$router.push('/cart/order-making');
    },
  },
};
</script>
