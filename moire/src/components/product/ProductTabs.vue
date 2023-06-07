<template>
  <ul class="tabs">
    <li class="tabs__item" v-for="(tab, index) in arrTabs" :key="index">
      <a
        href="#"
        class="tabs__link"
        :class="{ 'tabs__link--current': index === currentIndex }"
        @click.prevent="switchTabs(index)"
      >
        {{ tab }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['modelValue'],
  data() {
    return {
      arrTabs: ['Информация о товаре', 'Доставка и возврат'],
    };
  },
  computed: {
    currentIndex: {
      get() {
        return this.modelValue;
      },
      set(index) {
        this.$emit('update:modelValue', index);
      },
    },
  },
  methods: {
    switchTabs(index) {
      this.currentIndex = index;
    },
  },
};
</script>
