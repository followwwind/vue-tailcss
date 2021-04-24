import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue()],
  build: {
    // to make tests faster
    minify: false
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  server: {
    // host: 'localhost',//target host
    port: 8080,
    // proxy: {
    //   // 选项写法
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     // target: 'http://152.32.185.136:5000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //     // pathRewrite: {
    //     //   // 这里会把当前域名下路径/api开头的地方替换为http://127.0.0.1:8099/api【这样就可以和服务器nginx保持一致的路径】
    //     //   "^/api": "/api", // 设置/api路径重定向为根目录"/api";
    //     // },
    //   }
    // }
  }
})