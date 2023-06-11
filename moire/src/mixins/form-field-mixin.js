import BaseFormLabel from '@/components/base/BaseFormLabel.vue';

const formFieldMixin = {
  components: { BaseFormLabel },
  props: ['title', 'error', 'placeholder', 'modelValue'],
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};

export default formFieldMixin;
