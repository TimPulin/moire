<template>
  <BasePreloaderSmall
    :productsIsLoading="productsIsLoading"
    :productsLoadFault="productsLoadFault"
  />

  <div v-if="pageIsLoaded" class="content__top">
    <BaseBreadcrumbs
      :arr-sections="[
        { routeName: 'cart', slug: '', title: 'Корзина' },
        { title: 'Оформление заказа' },
      ]"
    />

    <div class="content__row">
      <h1 class="content__title">Оформление заказа</h1>
    </div>
  </div>

  <section class="cart" v-if="pageIsLoaded">
    <form
      class="cart__form form"
      method="POST"
      @submit.prevent="submitFormOrder"
    >
      <div class="cart__field">
        <div class="cart__data">
          <BaseFormFieldInput
            placeholder="Введите ваше полное имя"
            title="ФИО"
            :error="formErrors.name"
            v-model="formData.name"
            @focus="formErrors.name = ''"
          />

          <BaseFormFieldInput
            placeholder="Введите ваш адрес"
            title="Адрес доставки"
            :error="formErrors.address"
            v-model="formData.address"
            @focus="formErrors.address = ''"
          />

          <BaseFormFieldInput
            type="tel"
            placeholder="Введите ваш телефон"
            title="Телефон"
            :error="formErrors.phone"
            v-model="formData.phone"
            @focus="formErrors.phone = ''"
          />

          <BaseFormFieldInput
            type="email"
            placeholder="Введи ваш Email"
            title="Email"
            :error="formErrors.email"
            v-model="formData.email"
            @focus="formErrors.email = ''"
          />

          <BaseFormFieldTextAria
            placeholder="Ваши пожелания"
            title="Комментарий к заказу"
            :error="formErrors.comments"
            v-model="formData.comments"
          />
        </div>

        <div class="cart__options">
          <h3 class="cart__title">Доставка</h3>
          <ul class="cart__options options">
            <li class="options__item">
              <BaseCheckboxOrder
                :price="0"
                title="Самовывоз"
                name="delivery"
                :checkbox-value="1"
                :modelValue="formData.deliveryTypeId"
                @update:modelValue="updateDelivery"
              />
            </li>
            <li class="options__item">
              <BaseCheckboxOrder
                :price="290"
                title="Курьером"
                name="delivery"
                :checkbox-value="2"
                :modelValue="formData.deliveryTypeId"
                @update:modelValue="updateDelivery"
              />
            </li>
          </ul>

          <h3 class="cart__title">Оплата</h3>
          <ul class="cart__options options" v-if="paymentListIsLoaded">
            <li
              class="options__item"
              v-for="(item, index) in paymentWays"
              :key="index"
            >
              <BaseCheckboxOrder
                :price="null"
                :title="item.title"
                name="pay"
                :checkbox-value="item.id"
                :modelValue="formData.paymentTypeId"
                @update:modelValue="updatePaymentTypeId"
              />
            </li>
          </ul>
        </div>
      </div>

      <CartOrderList :items="cart.items" :delivery-price="deliveryPrice">
        <button class="cart__button button button--primery" type="submit">
          Оформить заказ
        </button>
      </CartOrderList>

      <div class="cart__error form__error-block" v-if="isErrorCatched">
        <h4>Заявка не отправлена!</h4>
        <p>
          {{ errorMessage }}
        </p>
      </div>
    </form>
  </section>
</template>

<script>
import axiosInstance from '@/helpers/axios-instance';
import getCartMixin from '@/mixins/get-cart';
import loadingProcessMixin from '@/mixins/loading-process';

import BaseBreadcrumbs from '@/components/base/BaseBreadcrumbs.vue';
import BasePreloaderSmall from '@/components/base/BasePreloaderSmall.vue';
import BaseFormFieldInput from '@/components/base/BaseFormFieldInput.vue';
import BaseFormFieldTextAria from '@/components/base/BaseFormFieldTextAria.vue';
import BaseCheckboxOrder from '@/components/base/BaseCheckboxOrder.vue';
import CartOrderList from '@/components/cart/CartOrderList.vue';

import { mapState } from 'vuex';

export default {
  components: {
    BaseBreadcrumbs,
    BasePreloaderSmall,
    BaseFormFieldInput,
    BaseFormFieldTextAria,
    BaseCheckboxOrder,
    CartOrderList,
  },
  mixins: [getCartMixin, loadingProcessMixin],
  data() {
    return {
      cart: {},
      paymentWays: [],
      paymentListIsLoaded: true,
      deliveryPrice: 0,
      pageIsLoaded: true,
      formData: {
        deliveryTypeId: 1,
        paymentTypeId: 1,
      },
      formErrors: {},
      errorCatched: false,
      errorMessage: '',
    };
  },
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
  created() {
    this.pageLoader();
  },
  methods: {
    pageLoader() {
      this.pageIsLoaded = false;
      Promise.all([
        this.loadPaymentWay(1),
        this.getCart(this.user.accessKey),
      ]).then(([, cart]) => {
        this.cart = cart;
        this.pageIsLoaded = true;
      });
    },
    submitFormOrder() {
      console.log(this.formData);
      return axiosInstance
        .post(
          '/orders',
          {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.user.accessKey,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            const messages = error.response.data.error.request;
            Object.assign(this.formErrors, messages);
            this.isErrorCatched = true;
            this.errorMessage = 'Пожалуйста, заполните отмеченные поля в форме';
          } else {
            this.isErrorCatched = true;
            this.errorMessage =
              'Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.';
          }
        });
    },
    updateDelivery({ value, price }) {
      this.formData.deliveryTypeId = value;
      this.deliveryPrice = price;
      this.loadPaymentWay(value);
    },
    updatePaymentTypeId({ value }) {
      this.formData.paymentTypeId = value;
    },
    loadPaymentWay(deliveryTypeId) {
      return axiosInstance
        .get('/payments', {
          params: {
            deliveryTypeId: deliveryTypeId,
          },
        })
        .then((response) => {
          this.updatePaymentTypeId({ value: 2 });
          this.paymentWays = response.data.reverse();
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    handleInputFormFocused(value) {
      console.log(value);
      if (value) {
        value = '';
      }
    },
  },
};
</script>
