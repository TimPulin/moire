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
      products: null,

      productColors: null,
      productMaterials: null,
      productCollections: null,
      productCategories: null,

      formColorId: [],
      formMaterialId: [],
      formCollectionId: [],
      formCategoryId: 0,
      formPriceFrom: 0,
      formPriceTo: 0,

      pageCurrent: 1,
      pageLimit: 12,

      productsAmount: null,
      productsAmountEnding: 'товаров',
    };
  }, // data
  created() {
    this.loadProducts();
    this.loadColors();
    this.loadMaterials();
    this.loadCollections();
    this.loadCategories();
  },
  methods: {
    loadProducts() {
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
          this.productsAmount = this.products.length;
          this.productAmountEnding = setProductsAmountEnding(
            this.productsAmount
          );
        });
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/colors`).then((response) => {
        this.productColors = formatObjectOfStrings(
          response.data.items,
          'title'
        );
      });
    },
    loadMaterials() {
      axios.get(`${API_BASE_URL}/materials`).then((response) => {
        this.productMaterials = response.data.items;
      });
    },
    loadCollections() {
      axios.get(`${API_BASE_URL}/seasons`).then((response) => {
        this.productCollections = response.data.items;
      });
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}/productCategories`).then((response) => {
        this.productCategories = formatObjectOfStrings(
          response.data.items,
          'title'
        );
      });
    },
  }, // methods
};
// TODO поставить условие isItemsReady = false, крутить спинер, когда данные загрузятся - поменять false на true, после начать отрисовку
</script>
