<template>
  <label class="options__label">
    <input
      class="options__radio sr-only"
      type="radio"
      :name="name"
      :value="checkboxValue"
      v-model="localValue"
    />
    <span class="options__value">
      {{ title }} <b v-if="priceDelivery">{{ priceDelivery }}</b></span
    >
  </label>
</template>

<script>
import formatPrice from '@/helpers/format-price';
export default {
  props: ['modelValue', 'checkboxValue', 'name', 'title', 'price'],
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', { value: value, price: this.price });
      },
    },
    priceDelivery() {
      if (this.price === null) return;
      if (this.price === 0) return 'бесплатно';
      return formatPrice(this.price);
    },
  },
};
</script>
