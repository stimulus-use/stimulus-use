import { defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    target: 'es2017'
  },
  test: {
    globals: true,
    include: ['spec/**/*_spec.js'],
    setupFiles: ['./spec/helpers/setup.js'],
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      screenshotFailures: false,
      instances: [{ browser: 'chromium' }]
    }
  }
})
