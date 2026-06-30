import { defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    target: 'es2020'
  },
  test: {
    globals: true,
    include: ['spec/**/*_spec.ts'],
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      screenshotFailures: false,
      instances: [{ browser: 'chromium' }]
    }
  }
})
