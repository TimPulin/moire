<template>
  <BasePreloaderSmall
    :productsIsLoading="productsIsLoading"
    :productsLoadFault="productsLoadFault"
  />

  <div v-if="pageIsLoaded" class="content__top">
    <BaseBreadcrumbs :arr-sections="[category]" />

    <div class="content__row">
      <h1 class="content__title">{{ categoryTitle }}</h1>
      <span class="content__info">
        {{ productsAmount }} {{ productsAmountEnding }}
      </span>
    </div>
  </div>

  <SectionCatalog
    :class="'catalog--category'"
    :products-is-loading="productsIsLoading"
    :products-load-fault="productsLoadFault"
    :products-is-loaded="productsIsLoaded"
    :products="products"
    @paginate="loadProducts"
  />
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';
import loadingProcessMixin from '@/mixins/loading-process';
import paginationConnectionMixin from '@/mixins/pagination-connection';

import setProductsAmountEnding from '@/helpers/set-product-amount-ending';

import SectionCatalog from '@/components/sections/SectionCatalog.vue';
import BaseBreadcrumbs from '@/components/base/BaseBreadcrumbs.vue';

export default {
  components: {
    BaseBreadcrumbs,
    SectionCatalog,
  },
  mixins: [loadingProcessMixin, paginationConnectionMixin],
  data() {
    return {
      products: {},
      category: {},

      productsAmount: 0,

      pageCurrent: 1,
      pagesAmount: 0,
      pageLimit: 12,
    };
  },
  computed: {
    productsAmountEnding() {
      return setProductsAmountEnding(this.productsAmount);
    },
    categoryTitle() {
      return this.category?.title ? this.category.title : '';
    },
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      this.setProductLoadingVars(true, false, false);
      axios
        .get(`${API_BASE_URL}/products`, {
          params: {
            page: this.pageCurrent,
            limit: this.pageLimit,
            categoryId: this.$route.params.id,

            colorIds: [],
            materialIds: [],
            seasonIds: [],
            minPrice: 0,
            maxPrice: 0,
          },
        })
        .then((response) => {
          this.products = response.data.items;
          this.productsAmount = response.data.pagination.total;
          this.pagesAmount = response.data.pagination.pages;

          this.getCategory(this.products[0].id);

          this.setProductLoadingVars(false, true, false);
        })
        .catch((error) => {
          console.log(`load products - ${error.message}`);
          this.products = [];
          this.productsAmount = 0;
          this.pagesAmount = 0;

          this.setProductLoadingVars(false, false, true);
        });
    },
    async getCategory(id) {
      const promise = axios
        .get(`${API_BASE_URL}/products/${id}`)
        .then((respose) => {
          return respose.data.category;
        })
        .catch((error) => {
          console.log(error.message);
          return '';
        });
      this.category = await promise;
    },
  },
};
</script>
