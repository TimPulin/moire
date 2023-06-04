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
        :index="index"
        :color-obj="colorObj"
        :pickedColor="pickedColor"
        @picked="handlePickedColor"
      />
    </ul>
  </li>
</template>
<script>
import ProductItemColor from '@/components/product/ProductItemColor.vue';
import renderProductPrice from '@/helpers/render-product-price';

export default {
  components: { ProductItemColor },
  props: ['product'],
  data() {
    return {
      pickedColor: this.product.colors[0].color.code,
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
  methods: {
    handlePickedColor({ value, indexColorObj }) {
      this.setPickedColor(value);
      this.setImgSrc(indexColorObj);
    },
    setPickedColor(value) {
      this.pickedColor = value;
    },
    setImgSrc(indexColorObj = 0) {
      if (this.product.colors[indexColorObj].gallery) {
        this.imgSrc = this.product.colors[indexColorObj].gallery[0].file.url;
      } else {
        this.imgSrc = './img/product-img-temporary.jpg';
      }
    },
  },
};
</script>
