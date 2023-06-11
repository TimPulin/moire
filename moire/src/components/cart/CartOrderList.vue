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
        Итого: <b> {{ cartItemAmount }}</b> товара на сумму
        <b>{{ cartPriceTotal }}</b>
      </p>
    </div>
    <slot />
  </div>
</template>

<script>
import formatPrice from '@/helpers/format-price';
import CartOrderItem from '@/components/cart/CartOrderItem.vue';

import { mapState } from 'vuex';
export default {
  components: { CartOrderItem },
  props: ['items', 'deliveryPrice'],
  computed: {
    ...mapState({
      cartItemAmount: 'cartItemAmount',
    }),
    cartPriceTotal() {
      const priceTotal = this.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, this.deliveryPrice);
      return formatPrice(priceTotal);
    },
    localDeliveryPrice() {
      return this.deliveryPrice === 0
        ? 'бесплатно'
        : formatPrice(this.deliveryPrice);
    },
  },
};
</script>
