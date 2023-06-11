<template>
  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ price }}</b>
    <span>Артикул: {{ item.product.id }}</span>
  </li>
</template>

<script>
import formatPrice from '@/helpers/format-price';
export default {
  props: ['item'],
  computed: {
    price() {
      return formatPrice(this.item.price * this.item.quantity);
    },
  },
};
</script>
