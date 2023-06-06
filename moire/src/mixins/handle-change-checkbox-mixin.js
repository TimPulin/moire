const handleChangeCheckboxMixin = {
  methods: {
    handleChange(isChecked) {
      this.$emit('change-checkbox', { itemId: this.item.id, isChecked });
    },
  },
};

export default handleChangeCheckboxMixin;
