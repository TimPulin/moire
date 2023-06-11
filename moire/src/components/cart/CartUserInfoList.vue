<template>
  <ul class="dictionary">
    <li class="dictionary__item">
      <span class="dictionary__key"> Получатель </span>
      <span class="dictionary__value"> {{ user.name }} </span>
    </li>
    <li class="dictionary__item">
      <span class="dictionary__key"> Адрес доставки </span>
      <span class="dictionary__value"> {{ user.address }} </span>
    </li>
    <li class="dictionary__item">
      <span class="dictionary__key"> Телефон </span>
      <span class="dictionary__value"> {{ user.phone }} </span>
    </li>
    <li class="dictionary__item">
      <span class="dictionary__key"> Email </span>
      <span class="dictionary__value"> {{ user.email }} </span>
    </li>
    <li class="dictionary__item">
      <span class="dictionary__key"> Способ оплаты </span>
      <span class="dictionary__value"> {{ user.paymentType }} </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['user'],
};
</script>
