import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Discovery from './views/Discovery.vue';
import Book from './views/Book.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/discovery/all',
      name: 'home',
      component: Discovery,
    },
    {
      path: '/discovery/:id',
      name: 'discovery',
      component: Discovery,
    },
    {
      path: '/book/:id',
      name: 'book',
      component: Book,
    },
  ],
});
