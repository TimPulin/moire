<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <a class="header__logo" href="#">
        <img
          src="img/svg/logo-moire.svg"
          alt="Логотип интернет магазина Moire"
          width="116"
          height="34"
        />
      </a>

      <a class="header__tel" type="tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>
      <router-link
        class="header__cart"
        aria-label="Корзина с товарами"
        :to="{ name: 'cart' }"
      >
        <svg width="19" height="24">
          <use xlink:href="#icon-cart" />
        </svg>
        <span class="header__count" aria-label="Количество товаров">
          {{ cartItemAmount }}</span
        >
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      cartItemAmount: 'cartItemAmount',
    }),
  },
};
</script>
