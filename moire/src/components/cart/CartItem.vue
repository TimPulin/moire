<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="srcImage"
        width="120"
        height="120"
        srcset="img/product-square-4@2x.jpg 2x"
        alt="Название товара"
      />
    </div>
    <h3 class="product__title">{{ product.product.title }}</h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ 'background-color': product.color.color.code }"></i>
        {{ product.color.color.title }}
      </span>
    </p>
    <span class="product__code"> Артикул: {{ product.product.id }} </span>

    <BaseInputAmount v-model:item-amount="productAmount" />

    <b class="product__price"> {{ renderPrice }} </b>
    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click="$emit('deleteProduct', product.id)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import renderProductPrice from '@/helpers/render-product-price';
import BaseInputAmount from '../base/BaseInputAmount.vue';

import { mapState } from 'vuex';

export default {
  components: { BaseInputAmount },
  props: ['product'],
  emits: ['deleteProduct', 'changeProductAmount'],
  data() {
    return {
      productAmount: Number(this.product.quantity),
    };
  },
  computed: {
    ...mapState({
      user: 'user',
    }),
    renderPrice() {
      return renderProductPrice(this.productPriceTotal());
    },
    srcImage() {
      if (this.product.color?.gallery) {
        return this.product.color.gallery[0].file.url;
      } else {
        return './img/product-img-temporary.jpg';
      }
    },
  },
  watch: {
    productAmount() {
      this.$emit('changeProductAmount', {
        amount: this.productAmount,
        id: this.product.id,
      });
    },
  },
  methods: {
    productPriceTotal() {
      return this.product.price * this.productAmount;
    },
  },
};
</script>
