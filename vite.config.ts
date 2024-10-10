import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
      alias: [
          {find: '@', replacement: '/src'},
          {find: '@components', replacement: '/src/components'},
          {find: '@pages', replacement: '/src/pages'},
          {find: '@assets', replacement: '/src/assets'},
          {find: '@styles', replacement: '/src/styles'},
          {find: '@data', replacement: '/src/data'},
          {find: '@store', replacement: '/src/store'},
          {find: '@hooks', replacement: '/src/hooks'},
      ]
    }
})
