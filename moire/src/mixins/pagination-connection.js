import { computed } from 'vue';

const paginationConnectionMixin = {
  provide() {
    return {
      pageCurrent: computed(() => this.pageCurrent),
      pagesAmount: computed(() => this.pagesAmount),
      changePageCurrent: this.changePageCurrent,
    };
  },
  methods: {
    changePageCurrent(value) {
      this.pageCurrent = value;
      this.loadProducts();
    },
  },
};

export default paginationConnectionMixin;
