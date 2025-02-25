import { createRouter, createWebHistory } from 'vue-router';
// import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
// import Login from '../views/Login.vue';

const routes = [
  { path: '/', component: Register },
  { path: '/login', component: Login }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
