<template>
  <li class="colors__item">
    <label class="colors__label">
      <input
        class="colors__radio sr-only"
        type="radio"
        :value="colorObj.id"
        v-model="currentColorId"
      />
      <span
        class="colors__value"
        :style="{ 'background-color': colorObj.color.code }"
      >
      </span>
    </label>
  </li>
</template>

<script>
export default {
  props: ['colorObjIndex', 'colorObj', 'modelValue'],
  computed: {
    currentColorId: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
        this.$emit('picked', this.colorObjIndex);
      },
    },
  }, // computed
};
</script>
