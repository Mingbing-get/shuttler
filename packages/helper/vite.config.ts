import path from 'path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'

import external from '../../scripts/external'

export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: '@arco-design/web-react',
          camel2DashComponentName: false,
          style: (name) => `@arco-design/web-react/es/${name}/style/css.js`,
        },
      ],
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'helper',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: external,
    },
  },
})
