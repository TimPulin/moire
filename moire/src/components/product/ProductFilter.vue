<template>
  <aside class="filter">
    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submitFormFilter"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>

        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>

        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <BaseSelect
            :list="productCategories"
            :select-name="'categories'"
            v-model="currentCategory"
          />
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="(item, index) in productMaterials"
            :key="index"
          >
            <BaseCheckbox :item="item" v-model="currentMaterials" />
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="(item, index) in productCollections"
            :key="index"
          >
            <BaseCheckbox :item="item" v-model="currentCollections" />
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors colors--black">
          <li
            class="colors__item"
            v-for="(item, index) in productColors"
            :key="index"
          >
            <BaseCheckboxColor :item="item" v-model="currentColors" />
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click="resetFormFilter"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>
<script>
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import BaseCheckboxColor from '@/components/base/BaseCheckboxColor.vue';

export default {
  components: { BaseSelect, BaseCheckbox, BaseCheckboxColor },
  props: [
    'productColors',
    'productMaterials',
    'productCollections',
    'productCategories',

    'formColorId',
    'formMaterialId',
    'formCollectionId',
    'formCategoryId',
    'formPriceFrom',
    'formPriceTo',
  ],
  data() {
    return {
      currentColors: [],
      currentMaterials: [],
      currentCollections: [],
      currentCategory: 0,
      currentPriceFrom: 0,
      currentPriceTo: 0,
    };
  },
  watch: {
    formColorId(value) {
      this.currentColors = value;
    },
    formMaterialId(value) {
      this.currentMaterials = value;
    },
    formCollectionId(value) {
      this.currentCollections = value;
    },
    formCategoryId(value) {
      this.currentCategory = value;
    },
    formPriceFrom(value) {
      this.currentPriceFrom = value;
    },
    formPriceTo(value) {
      this.currentPriceTo = value;
    },
  },
  methods: {
    submitFormFilter() {
      this.$emit('update:formColorId', this.currentColors);
      this.$emit('update:formMaterialId', this.currentMaterials);
      this.$emit('update:formCollectionId', this.currentCollections);
      this.$emit('update:formCategoryId', this.currentCategory);
      this.$emit('update:formPriceFrom', this.currentPriceFrom);
      this.$emit('update:formPriceTo', this.currentPriceTo);
      this.$emit('submitFormFilter');
    },
    resetFormFilter() {
      this.$emit('update:formColorId', []);
      this.$emit('update:formMaterialId', []);
      this.$emit('update:formCollectionId', []);
      this.$emit('update:formCategoryId', 0);
      this.$emit('update:formPriceFrom', 0);
      this.$emit('update:formPriceTo', 0);
      this.$emit('submitFormFilter');
    },
  },
};
</script>
