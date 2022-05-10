import { defineConfig } from 'vite'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 8080
  },
  resolve: {
    alias: {
      'stimulus-use': path.resolve(__dirname, '../dist/index.js')
    }
  },
  plugins: []
})
