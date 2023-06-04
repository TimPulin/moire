<template>
  <div>
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info">
          {{ productsAmount }} {{ productsAmountEnding }}
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter />
      <section class="catalog">
        <ul class="catalog__list">
          <ProductItem
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </ul>

        <BasePagination />
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';
import ProductFilter from '@/components/product/ProductFilter.vue';
import ProductItem from '@/components/product/ProductItem.vue';
import BasePagination from '@/components/base/BasePagination.vue';
export default {
  components: {
    ProductFilter,
    ProductItem,
    BasePagination,
  },
  data() {
    return {
      products: null,
      productsAmount: null,
      productsAmountEnding: 'товаров',
    };
  }, // data
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      axios.get(`${API_BASE_URL}/products`).then((response) => {
        this.products = response.data.items;
        this.productsAmount = this.products.length;
        this.setProductsAmountEnding(this.productsAmount);
      });
    },
    setProductsAmountEnding(amount) {
      console.log('norm');
      if (amount >= 11 && amount < 20) {
        this.productsAmountEnding = 'товаров';
        return;
      }
      switch (true) {
        case Number(String(amount).slice(-1)) === 0:
          this.productsAmountEnding = 'товаров';
          break;
        case Number(String(amount).slice(-1)) === 1:
          this.productsAmountEnding = 'товар';
          break;
        case Number(String(amount).slice(-1)) <= 4:
          this.productsAmountEnding = 'товара';
          break;
        case Number(String(amount).slice(-1)) > 4:
          this.productsAmountEnding = 'товаров';
          break;
      }
    },
  }, // methods
};
</script>
