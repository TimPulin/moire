<template>
  <label class="colors__label">
    <input
      class="colors__radio sr-only"
      type="checkbox"
      name="color"
      :value="item.id"
      v-model="currentValue"
    />
    <span class="colors__value" :style="{ 'background-color': item.code }">
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
