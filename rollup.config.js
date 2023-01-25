import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import filesize from 'rollup-plugin-filesize'

import { version } from './package.json'
const year = new Date().getFullYear()
const banner = `/*\nStimulus-Use ${version}\n*/`

export default [
  {
    input: 'src/index.ts',
    external: ['@hotwired/stimulus'],
    output: [
      {
        name: 'StimulusUse',
        file: 'dist/index.umd.js',
        format: 'umd',
        banner,
        globals: {
          '@hotwired/stimulus': 'Stimulus'
        }
      },
      {
        file: 'dist/index.js',
        format: 'es',
        banner
      }
    ],
    plugins: [resolve(), typescript(), filesize()],
    watch: {
      include: 'src/**'
    }
  },
  {
    input: 'src/hotkeys.ts',
    external: ['@hotwired/stimulus', 'hotkeys-js'],
    output: [
      {
        name: 'StimulusUseHotkeys',
        file: 'dist/hotkeys.umd.js',
        format: 'umd',
        banner,
        globals: {
          '@hotwired/stimulus': 'Stimulus',
          'hotkeys-js': 'hotkeys'
        }
      },
      {
        file: 'dist/hotkeys.js',
        format: 'es',
        banner
      }
    ],
    plugins: [resolve(), typescript(), filesize()],
    watch: {
      include: ['src/hotkeys.ts', 'src/use-hotkeys/**/*']
    }
  }
]
