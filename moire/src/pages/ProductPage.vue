<template>
  <div>
    <BasePreloaderSmall
      :productsIsLoading="productsIsLoading"
      :productsLoadFault="productsLoadFault"
    />

    <div v-if="pageIsLoaded" class="content__top">
      <BaseBreadcrumbs :arr-sections="[category, product]" />
    </div>

    <section v-if="pageIsLoaded" class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="imgSrc" :alt="product.title" />
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productId }}</span>
        <h2 class="item__title">{{ product.title }}</h2>

        <div class="item__form">
          <form class="form" method="POST" @submit.prevent="submitFormProduct">
            <div class="item__row item__row--center">
              <BaseInputAmount v-model:item-amount="itemAmount" />

              <b class="item__price"> {{ productPriceTotal }} </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <ProductItemColor
                    v-for="(colorObj, index) in product.colors"
                    input-name="colorId"
                    :key="index"
                    :colorObjIndex="index"
                    :color-obj="colorObj"
                    v-model="pickedColorId"
                    @picked="setImgSrc"
                  />
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label
                  class="form__label form__label--small form__label--select"
                >
                  <BaseSelect
                    selectName="sizeId"
                    :list="product.sizes"
                    :isZeroOptionShow="false"
                    v-model="pickedSizeId"
                  />
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ProductTabs v-model="currentTabIndex" />

        <div class="item__content" v-show="currentTabIndex === 0">
          <h3>Состав:</h3>
          <p>
            <span v-for="(material, index) in product.materials" :key="index">
              <span>{{ material.title }}</span>
              <br />
            </span>
          </p>

          <h3>Уход:</h3>
          <p>
            {{ productDescription }}
          </p>
        </div>

        <div class="item__content" v-show="currentTabIndex === 1">
          <h3>Доставка</h3>
          <p></p>
          <h3>Возврат</h3>
          <p></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axiosInstance from '@/helpers/axios-instance';

import setImgSrcMixin from '@/mixins/set-img-src';
import loadingProcessMixin from '@/mixins/loading-process';

import renderProductPrice from '@/helpers/render-product-price';
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
} from '@/helpers/local-storage-connection';

import BaseBreadcrumbs from '@/components/base/BaseBreadcrumbs.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import ProductItemColor from '@/components/product/ProductItemColor.vue';
import BasePreloaderSmall from '@/components/base/BasePreloaderSmall.vue';
import BaseInputAmount from '@/components/base/BaseInputAmount.vue';
import ProductTabs from '@/components/product/ProductTabs.vue';

export default {
  components: {
    BaseBreadcrumbs,
    ProductItemColor,
    BaseSelect,
    BasePreloaderSmall,
    BaseInputAmount,
    ProductTabs,
  },
  mixins: [setImgSrcMixin, loadingProcessMixin],
  data() {
    return {
      product: {},
      category: {},

      pickedColorId: null,
      pickedSizeId: null,
      itemAmount: 1,

      imgSrc: null,
      currentTabIndex: 0,
    };
  },
  computed: {
    productDescription() {
      return this.product?.content === ''
        ? 'Описание продукта не нашли'
        : this.product.content;
    },
    productPriceTotal() {
      return renderProductPrice(this.itemAmount * this.product.price);
    },
  },
  watch: {
    '$route.params.id': function () {
      this.loadProduct();
    },
  },
  created() {
    this.loadProduct();
  },
  // TODO проверить, нужен ли watch 'routre.params.id' для загрузки или изменения страницы
  methods: {
    loadProduct() {
      this.pageIsLoaded = false;
      this.setProductLoadingVars(true, false, false);
      axiosInstance
        .get(`/products/${this.$route.params.id}`)
        .then((respose) => {
          this.product = respose.data;
          this.product.routeName = 'product';
          this.category = respose.data.category;
          this.category.routeName = 'category';
          this.pickedColorId = respose.data.colors[0].color.id;
          this.pickedSizeId = respose.data.sizes[0].id;
          this.setImgSrc(0);
          this.setProductLoadingVars(false, true, false);
          this.pageIsLoaded = true;
        })
        .catch((error) => {
          console.log(error.message);
          this.product = {};
          this.setProductLoadingVars(false, false, true);
        });
    },
    sendProductToBasket(request) {
      // console.log(request);
      const userAccessKey = getUserFromLocalStorage().accessKey;

      axiosInstance
        .post(
          '/baskets/products',
          {
            ...request,
          },
          {
            params: {
              userAccessKey: userAccessKey,
            },
          }
        )
        .then((response) => {
          console.log(response.data.items);

          if (userAccessKey === '') setUserToLocalStorage(response.data.user);
        });
      //TODO добавить спинер на кнопку "В корзину", кнопку заблокировать до прихода ответа с сервера
    },
    submitFormProduct(event) {
      const formData = new FormData(event.target);
      formData.append('productId', this.product.id);

      const data = Object.fromEntries(formData);
      this.sendProductToBasket(data);
    },
  },
};
</script>
