<template>
  <select
    class="form__select"
    type="text"
    :name="selectName"
    :value="modelValue"
    @change="sendSelectedValue($event.target.value)"
  >
    <option value="0" selected>Все категории</option>
    <option
      v-for="item in list"
      :value="item.id"
      :key="item.id"
      :label="item.title"
    ></option>
  </select>
</template>

<script>
export default {
  props: ['list', 'selectName', 'modelValue'],
  methods: {
    sendSelectedValue(value) {
      this.$emit('update:modelValue', Number(value));
    },
  },
};
</script>
