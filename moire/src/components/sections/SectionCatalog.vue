<template>
  <section class="catalog">
    <BasePreloaderSmall
      :products-is-loading="productsIsLoading"
      :products-load-fault="productsLoadFault"
    />

    <ul v-if="productsIsLoaded" class="catalog__list">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </ul>

    <BasePagination />
  </section>
</template>

<script>
import BasePreloaderSmall from '@/components/base/BasePreloaderSmall.vue';
import ProductItem from '@/components/product/ProductItem.vue';
import BasePagination from '@/components/base/BasePagination.vue';

export default {
  components: { BasePreloaderSmall, ProductItem, BasePagination },
  props: [
    'productsIsLoading',
    'productsLoadFault',
    'productsIsLoaded',
    'products',
  ],
};
</script>

<style>
.catalog--category .catalog__list {
  grid-template-columns: repeat(4, 270px);
}
</style>
