<template>
  <BaseFormLabel :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      :name="name"
      :placeholder="placeholder"
      v-model="localValue"
    ></textarea>
  </BaseFormLabel>
</template>

<script>
import formFieldMixin from '@/mixins/form-field-mixin';

export default {
  mixins: [formFieldMixin],
  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
};
</script>
