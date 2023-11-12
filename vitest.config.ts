import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        include: [
          'src/**'
        ],
        exclude: [
          'src/App.vue',
          'src/main.ts',
          'src/modules/status/interfaces/*',
          'src/router/index.ts'
        ],
        all: true,
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100
      }
    }
  })
)
