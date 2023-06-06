<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        href="#"
        aria-label="Предыдущая страница"
        class="pagination__link pagination__link--arrow"
        :class="disableClassArrow(1)"
        @click.prevent="priviousPage()"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li
      class="pagination__item"
      v-for="pageNumber in pagesAmount"
      :key="pageNumber"
    >
      <a
        href="#"
        class="pagination__link"
        :class="disablePageLink(pageNumber)"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        href="#"
        aria-label="Следующая страница"
        class="pagination__link pagination__link--arrow"
        :class="disableClassArrow(pagesAmount)"
        @click.prevent="nextPage()"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['pageCurrent', 'pagesAmount'], // methods
  methods: {
    isCurrent(pageNumber) {
      return this.pageCurrent === pageNumber;
    },
    disablePageLink(pageNumber) {
      return {
        'pagination__link--current': this.isCurrent(pageNumber),
        'pagination__link--disabled': this.isCurrent(pageNumber),
      };
    },
    disableClassArrow(stopPage) {
      return {
        'pagination__link--disabled': this.pageCurrent === stopPage,
      };
    },
    priviousPage() {
      if (this.pageCurrent > 1) {
        this.paginate(this.pageCurrent - 1);
      }
    },
    nextPage() {
      if (this.pageCurrent < this.pagesAmount) {
        this.paginate(this.pageCurrent + 1);
      }
    },
    paginate(pageCurrent) {
      this.$emit('update:pageCurrent', pageCurrent);
      this.$emit('paginate');
    },
  }, // computed
};
</script>
