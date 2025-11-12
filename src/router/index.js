import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import PostView from '@/views/PostView.vue';
import AboutView from '@/views/AboutView.vue';
import NotFound from '@/views/NotFound.vue';
import CounterView from '@/views/CounterView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: PostView,
    props: true, 
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/counter',
    name: 'Counter',
    component: CounterView, 
  },
  {
   
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
