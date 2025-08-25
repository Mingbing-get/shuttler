import path from 'path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import external from '../../scripts/external'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'store',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: external,
    },
  },
})
