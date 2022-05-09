import { defineConfig } from 'vite'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      'stimulus-use': path.resolve(__dirname, '../dist/index.js')
    }
  },
  plugins: []
})
