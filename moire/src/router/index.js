import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import CategoryPage from '@/pages/CategoryPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderMakingPage from '@/pages/OrderMakingPage.vue';

const routes = [
  {
    name: 'main',
    component: MainPage,
    path: '/',
  },
  {
    name: 'category',
    component: CategoryPage,
    path: '/:id',
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/:id/:id',
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart',
  },
  {
    name: 'order-making',
    component: OrderMakingPage,
    path: '/cart/order-making',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
