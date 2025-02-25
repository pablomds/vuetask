import { createRouter, createWebHistory } from 'vue-router';
// import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import TodoList from '@/views/TodoList.vue';
// import Login from '../views/Login.vue';

const routes = [
  { path: '/', component: Register },
  { path: '/login', component: Login },
  { path: '/todo-list', component: TodoList },
];

export default createRouter({
  history: createWebHistory(),
  routes
});
