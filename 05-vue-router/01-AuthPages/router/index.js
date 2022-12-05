import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/PageIndex'),
  },
  {
    path: '/login:from?',
    name: 'login',
    component: () => import('../views/PageLogin'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/PageRegister'),
  },
];

export const router = createRouter({
  mode: 'history',
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  base: '/05-vue-router/01-AuthPages',
  routes,
});
