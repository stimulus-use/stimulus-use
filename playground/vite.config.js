import { defineConfig } from 'vite'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'stimulus-use': path.resolve(__dirname, '../dist/index.js')
    }
  },
  plugins: []
})
