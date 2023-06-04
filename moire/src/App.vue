<template>
  <SiteHeader />
  <main class="content container">
    <router-view />
  </main>
  <SiteFooter />
</template>

<script>
import SiteHeader from '@/components/site/SiteHeader.vue';
import SiteFooter from './components/site/SiteFooter.vue';

export default (await import('vue')).defineComponent({
  components: {
    SiteHeader,
    SiteFooter,
  },
});
</script>
