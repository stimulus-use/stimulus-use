import { defineConfig } from 'rolldown'
import { readFileSync } from 'fs'

const json = JSON.parse(readFileSync('./package.json'))
const banner = `/*\n * stimulus-use ${json.version}\n */`

const pretty = {
  compress: false,
  mangle: false,
  codegen: {
    removeWhitespace: false,
    legalComments: 'inline'
  }
}

const transform = { target: 'es2020' }

export default defineConfig([
  {
    input: 'src/index.ts',
    transform,
    external: ['@hotwired/stimulus'],
    output: [
      {
        name: 'StimulusUse',
        file: 'dist/index.umd.js',
        format: 'umd',
        banner,
        minify: pretty,
        globals: {
          '@hotwired/stimulus': 'Stimulus'
        }
      },
      {
        file: 'dist/index.js',
        format: 'es',
        banner,
        minify: pretty
      }
    ],
    watch: {
      include: 'src/**'
    }
  },
  {
    input: 'src/hotkeys.ts',
    transform,
    external: ['@hotwired/stimulus', 'hotkeys-js'],
    output: [
      {
        name: 'StimulusUseHotkeys',
        file: 'dist/hotkeys.umd.js',
        format: 'umd',
        banner,
        minify: pretty,
        globals: {
          '@hotwired/stimulus': 'Stimulus',
          'hotkeys-js': 'hotkeys'
        }
      },
      {
        file: 'dist/hotkeys.js',
        format: 'es',
        banner,
        minify: pretty
      }
    ],
    watch: {
      include: ['src/hotkeys.ts', 'src/use-hotkeys/**/*']
    }
  }
])
