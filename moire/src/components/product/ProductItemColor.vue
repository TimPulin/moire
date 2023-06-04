<template>
  <li class="colors__item">
    <label class="colors__label">
      <input
        class="colors__radio sr-only"
        type="radio"
        :value="colorObj.color.code"
        v-model="localPickedColor"
        @click="sendParams"
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
  props: ['index', 'colorObj', 'pickedColor'],
  computed: {
    localPickedColor: {
      get() {
        return this.pickedColor;
      },
      set(value) {
        this.$emit('picked', { value, indexColorObj: this.index });
      },
    },
  }, // computed
};
</script>
