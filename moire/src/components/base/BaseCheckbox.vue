<template>
  <label class="check-list__label">
    <input
      class="check-list__check sr-only"
      type="checkbox"
      name="material"
      :value="item.id"
      v-model="currentValue"
    />
    <span class="check-list__desc">
      {{ item.title }}
      <span>{{ item.productsCount }}</span>
    </span>
  </label>
</template>

<script>
export default {
  props: ['item', 'modelValue'],
  computed: {
    currentValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
