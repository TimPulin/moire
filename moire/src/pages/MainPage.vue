<template>
  <div class="loader" v-if="pageIsLoading">
    <img
      src="../../public/img/gif/moving-block.gif"
      alt="изображение загрузчика страницы"
    />
  </div>
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

      <section class="catalog">
        <div class="loader" v-if="productsIsLoading">
          <img
            src="../../public/img/gif/moving-block.gif"
            alt="изображение загрузчика страницы"
          />
        </div>

        <div class="loader" v-if="productsLoadFault">
          <span>Произошла ошибка во время загрузки товаров</span>
        </div>

        <ul v-if="productsIsLoaded" class="catalog__list">
          <ProductItem
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </ul>

        <BasePagination
          :pages-amount="pagesAmount"
          v-model:page-current="pageCurrent"
          @paginate="loadProducts"
        />
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';
import setProductsAmountEnding from '@/helpers/set-product-amount-ending';
import formatObjectOfStrings from '@/helpers/format-object-of-strings';
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

      pageIsLoading: false,
      pageIsLoaded: true,

      productsIsLoading: false,
      productsIsLoaded: true,
      productsLoadFault: false,
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
    async loaderPage(arrRequests) {
      this.pageIsLoading = true;
      this.pageIsLoaded = false;

      await Promise.all(arrRequests);

      this.pageIsLoading = false;
      this.pageIsLoaded = true;
    },
    loadProducts() {
      this.productsIsLoading = true;
      this.productsIsLoaded = false;
      this.productsLoadFault = false;

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

          this.productsIsLoading = false;
          this.productsIsLoaded = true;
          this.productsLoadFault = false;
        })
        .catch((error) => {
          console.log(`load products - ${error.message}`);
          this.products = [];
          this.productsAmount = 0;
          this.pagesAmount = 0;
          this.productAmountEnding = 'товаров';

          this.productsIsLoading = false;
          this.productsIsLoaded = false;
          this.productsLoadFault = true;
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
// TODO поставить условие isItemsReady = false, крутить спинер, когда данные загрузятся - поменять false на true, после начать отрисовку
</script>

<style>
.loader {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loader__message {
  position: relative;
  left: 50%;
  display: inline-block;
  transform: translateX(-50%);
}
</style>
