<template>
  <div v-if="pageIsLoaded">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info">
          {{ productsAmount }} {{ productsAmountEnding }}
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :product-colors="productColors"
        :product-materials="productMaterials"
        :product-collections="productCollections"
        :product-categories="productCategories"
        v-model:form-color-id="formColorId"
        v-model:form-material-id="formMaterialId"
        v-model:form-collection-id="formCollectionId"
        v-model:form-category-id="formCategoryId"
        v-model:form-price-from="formPriceFrom"
        v-model:form-price-to="formPriceTo"
        @submit-form-filter="loadProducts"
      />

      <SectionCatalog
        :products-is-loading="productsIsLoading"
        :products-load-fault="productsLoadFault"
        :products-is-loaded="productsIsLoaded"
        :products="products"
        @paginate="loadProducts"
      />
      <!-- v-model:page-current="pageCurrent" -->
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import axios from 'axios';
import API_BASE_URL from '@/config';
import loadingProcessMixin from '@/mixins/loading-process';

import setProductsAmountEnding from '@/helpers/set-product-amount-ending';
import formatObjectOfStrings from '@/helpers/format-object-of-strings';

import SectionCatalog from '@/components/sections/SectionCatalog.vue';
import ProductFilter from '@/components/product/ProductFilter.vue';

export default {
  components: {
    ProductFilter,
    SectionCatalog,
  },
  mixins: [loadingProcessMixin],
  provide() {
    return {
      pageCurrent: computed(() => this.pageCurrent),
      pagesAmount: computed(() => this.pagesAmount),
      changePageCurrent: this.changePageCurrent,
    };
  },
  data() {
    return {
      products: [],

      productColors: [],
      productMaterials: [],
      productCollections: [],
      productCategories: [],

      formColorId: [],
      formMaterialId: [],
      formCollectionId: [],
      formCategoryId: 0,
      formPriceFrom: 0,
      formPriceTo: 0,

      pageCurrent: 1,
      pagesAmount: 0,
      pageLimit: 12,

      productsAmount: 0,
      productsAmountEnding: 'товаров',
    };
  }, // data
  created() {
    this.loaderPage([
      this.loadProducts(),
      this.loadColors(),
      this.loadMaterials(),
      this.loadCollections(),
      this.loadCategories(),
    ]);
  },
  methods: {
    changePageCurrent(value) {
      this.pageCurrent = value;
      this.loadProducts();
      console.log(this.pageCurrent);
    },
    async loaderPage(arrRequests) {
      this.pageIsLoaded = false;

      await Promise.all(arrRequests);
      // TODO проверить ассинхроннсть этой функции
      this.pageIsLoaded = true;
    },
    loadProducts() {
      this.setProductLoadingVars(true, false, false);

      axios
        .get(`${API_BASE_URL}/products`, {
          params: {
            page: this.pageCurrent,
            limit: this.pageLimit,
            colorIds: this.formColorId,
            materialIds: this.formMaterialId,
            seasonIds: this.formCollectionId,
            categoryId: this.formCategoryId,
            minPrice: this.formPriceFrom,
            maxPrice: this.formPriceTo,
          },
        })
        .then((response) => {
          this.products = response.data.items;
          this.productsAmount = response.data.pagination.total;
          this.pagesAmount = response.data.pagination.pages;
          this.productAmountEnding = setProductsAmountEnding(
            this.productsAmount
          );
          this.setProductLoadingVars(false, true, false);
        })
        .catch((error) => {
          console.log(`load products - ${error.message}`);
          this.products = [];
          this.productsAmount = 0;
          this.pagesAmount = 0;
          this.productAmountEnding = 'товаров';

          this.setProductLoadingVars(false, false, true);
        });
    },
    loadColors() {
      axios
        .get(`${API_BASE_URL}/colors`)
        .then((response) => {
          this.productColors = formatObjectOfStrings(
            response.data.items,
            'title'
          );
        })
        .catch((error) => {
          console.log(`load colors - ${error.message}`);
          this.productColors = [];
        });
    },
    loadMaterials() {
      axios
        .get(`${API_BASE_URL}/materials`)
        .then((response) => {
          this.productMaterials = response.data.items;
        })
        .catch((error) => {
          console.log(`load materials - ${error.message}`);
          this.productMaterials = [];
        });
    },
    loadCollections() {
      axios
        .get(`${API_BASE_URL}/seasons`)
        .then((response) => {
          this.productCollections = response.data.items;
        })
        .catch((error) => {
          console.log(`load collections - ${error.message}`);
          this.productCollections = [];
        });
    },
    loadCategories() {
      axios
        .get(`${API_BASE_URL}/productCategories`)
        .then((response) => {
          this.productCategories = formatObjectOfStrings(
            response.data.items,
            'title'
          );
        })
        .catch((error) => {
          console.log(`load categories - ${error.message}`);
          this.productCategories = [];
        });
    },
  }, // methods
};
// TODO показать сообщение при отсутствии товаров после фильтрации
</script>
