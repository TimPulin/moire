<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link class="breadcrumbs_link" :to="{ name: 'main' }">
        Каталог
      </router-link>
    </li>
    <li
      class="breadcrumbs__item"
      v-for="(item, index) in arrSections"
      :key="index"
    >
      <router-link
        v-if="isShow(index)"
        class="breadcrumbs_link"
        :to="{ name: item.routeName, params: { id: item.slug } }"
        >{{ item.title }}</router-link
      >
      <a v-else class="breadcrumbs_link">
        {{ item.title }}
      </a>
    </li>
  </ul>
  <!-- breadcrumbs -->
</template>

<script>
export default {
  props: {
    arrSections: Array,
  },
  methods: {
    isShow(index) {
      return index !== this.arrSections.length - 1;
    },
  },
};
</script>

<style>
.link--disabled {
  cursor: not-allowed;
}
</style>
