<template>
  <BaseFormLabel :title="title" :error="error">
    <input
      class="form__input"
      :type="type"
      :placeholder="placeholder"
      v-model="localValue"
      @focus="$emit('focus')"
    />
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
  emits: ['focus'],
};
</script>
