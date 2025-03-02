import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import TodoList from '@/views/TodoList.vue';
import axiosInstance from '@/utils/axios';
// import Login from '../views/Login.vue';


const routes = [
  { path: '/', component: Register },
  { path: '/login', component: Login },
  { path: '/todo-list', component: TodoList, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, _, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await axiosInstance.get('/users/me');

      if (!response.statusText) {
        throw new Error('Not authenticated');
      }

      next(); 

    } catch (error) {
      console.warn('User not authenticated, redirecting to login');
      next('/login');
    }
  } else {
    next();
  }
});

export default router