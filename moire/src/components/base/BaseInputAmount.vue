<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="decreaseAmount"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      name="count"
      class="input-amount"
      type="number"
      v-model.number="amount"
    />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="increaseAmount"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['itemAmount'],
  data() {
    return {
      currentAmount: this.itemAmount,
    };
  },
  computed: {
    amount: {
      get() {
        return this.itemAmount;
      },
      set(value) {
        this.$emit('update:itemAmount', value);
      },
    },
  },
  methods: {
    increaseAmount() {
      this.amount += 1;
    },
    decreaseAmount() {
      if (this.amount > 1) {
        this.amount -= 1;
      }
    },
  }, // methods
};
</script>

<style>
.form__counter {
  margin-bottom: 15px;
}
.form__counter .input-amount {
  -moz-appearance: none;
  appearance: none;
}

.form__counter .input-amount:hover,
.form__counter .input-amount:focus {
  -moz-appearance: number-input;
  appearance: number-input;
}

.form__counter .input-amount::-webkit-outer-spin-button,
.form__counter .input-amount::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
