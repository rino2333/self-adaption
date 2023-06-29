import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: '/org_jxjy/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://hkxyzk-test.whxunw.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/admin_ct': {
        // target: 'https://sebms-test.whxunw.com/ct-admin',
        // target: 'http://192.168.110.63:8080',
        target: 'http://192.168.110.119:8080',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/jsp/, '')
      },
      '/zd-admin': {
        target: 'https://sebms-test.whxunw.com/zd-admin',
        // target: 'http://192.168.110.65:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/zd-admin/, '')
      },
      '/htgl': {
        target: 'https://portalmng-test.whxunw.com/',
        // target: 'http://192.168.110.151:9090/',
        changeOrigin: true
      },
      '/myapp': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/myapp/, '')
      }
    },
    // hmr: true
  }
})
