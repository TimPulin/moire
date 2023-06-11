<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <CartOrderItem v-for="(item, index) in items" :key="index" :item="item" />
    </ul>

    <div class="cart__total">
      <p>
        Доставка: <b>{{ localDeliveryPrice }}</b>
      </p>
      <p>
        Итого: <b> {{ cartItemAmount }}</b> {{ productsAmountEnding }} на сумму
        <b>{{ cartPriceTotal }}</b>
      </p>
    </div>
    <slot />
  </div>
</template>

<script>
import formatPrice from '@/helpers/format-price';
import setProductsAmountEnding from '@/helpers/set-product-amount-ending';
import CartOrderItem from '@/components/cart/CartOrderItem.vue';

export default {
  components: { CartOrderItem },
  props: ['items', 'deliveryPrice'],
  data() {
    return { cartItemAmount: 0 };
  },
  computed: {
    productsAmountEnding() {
      return setProductsAmountEnding(this.cartItemAmount);
    },

    cartPriceTotal() {
      const priceTotal = this.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, Number(this.deliveryPrice));
      return formatPrice(priceTotal);
    },
    localDeliveryPrice() {
      return Number(this.deliveryPrice) === 0
        ? 'бесплатно'
        : formatPrice(this.deliveryPrice);
    },
  },
  created() {
    this.calcCartItemAmount();
  },
  methods: {
    calcCartItemAmount() {
      this.cartItemAmount = this.items.length;
      // this.cartItemAmount = this.items.reduce((total, item) => {
      //   return total + item.quantity;
      // }, 0);
    },
  },
};
</script>
