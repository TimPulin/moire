<template>
  <div class="loader" v-if="productsIsLoading">
    <img
      src="../../../public/img/gif/moving-block.gif"
      alt="изображение загрузчика страницы"
    />
  </div>

  <div class="loader" v-if="productsLoadFault">
    <span>Произошла ошибка во время загрузки товаров</span>
  </div>
</template>

<script>
export default {
  props: ['productsIsLoading', 'productsLoadFault'],
};
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
