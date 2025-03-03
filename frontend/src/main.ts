import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import App from './App.vue';
import router from './router';
import "./style.css"



const app = createApp(App);

app.use(Vue3Toastify, {
    autoClose: 3000,
    theme: "dark",
    style: {
        "--toastify-color-progress-bar": "#DDD0C8",
        "--toastify-icon-color-close": "white",
      },
  } as ToastContainerOptions);

app.use(createPinia());
app.use(router);
app.mount('#app');
