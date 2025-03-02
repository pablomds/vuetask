import { defineConfig, loadEnv } from 'vite';

import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';

const env = loadEnv(
  'all',
  process.cwd()
);


export default defineConfig({
  plugins: [vue(), tailwindcss(), svgLoader()],
  resolve: {
    alias: {
      '@': '/src' 
    }
  },
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_BASE_URL, // Your Fastify server URL
        changeOrigin: true,
        secure: env.VITE_NODE_ENV === "production", // Set to true if using HTTPS
      },
    },
  },
});