<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="imgSrc" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price">
      {{ productPrice }}
    </span>

    <ul class="colors colors--black">
      <ProductItemColor
        v-for="(colorObj, index) in product.colors"
        :key="index"
        :colorObjIndex="index"
        :color-obj="colorObj"
        v-model="pickedColorId"
        @picked="setImgSrc"
      />
    </ul>
  </li>
</template>
<script>
import setImgSrcMixin from '@/mixins/set-img-src';
import renderProductPrice from '@/helpers/render-product-price';
import ProductItemColor from '@/components/product/ProductItemColor.vue';

export default {
  components: { ProductItemColor },
  mixins: [setImgSrcMixin],
  props: ['product'],
  data() {
    return {
      pickedColorId: this.product.colors[0].id,
      imgSrc: null,
    };
  },
  computed: {
    productPrice() {
      return renderProductPrice(this.product.price);
    },
  },
  created() {
    this.setImgSrc(0);
  },
};
</script>
