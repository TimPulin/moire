<template>
  <li class="catalog__item">
    <a href="#" @click.prevent="goToProductPage" class="catalog__pic">
      <img :src="imgSrc" :alt="product.title" />
    </a>

    <h3 class="catalog__title">
      <a href="#" @click.prevent="goToProductPage"> {{ product.title }} </a>
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
import axios from 'axios';
import API_BASE_URL from '@/config';
import setImgSrcMixin from '@/mixins/set-img-src';
import renderProductPrice from '@/helpers/render-product-price';
import ProductItemColor from '@/components/product/ProductItemColor.vue';

export default {
  components: { ProductItemColor },
  mixins: [setImgSrcMixin],
  props: ['product'],
  data() {
    return {
      pickedColorId: this.product.colors[0].color.id,
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
    async goToProductPage() {
      const category = await this.loadProduct();
      this.$router.push(`/${category.slug}/${this.product.slug}`);
    },
    loadProduct() {
      const promise = axios
        .get(`${API_BASE_URL}/products/${this.product.id}`)
        .then((respose) => {
          return respose.data.category;
        })
        .catch((error) => {
          console.log(error.message);
          return {};
        });
      return promise;
    },
  },
};
</script>
