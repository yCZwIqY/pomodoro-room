import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: "Pomodoro Room",
                short_name: "Pomodoro Room",
                description: "Complete your Pomodoro routine and decorate your room",
                icons: [
                    {
                        src: '/favicon.ico',
                        sizes: "16x16",
                        type: "favicon/ico",
                        form_factor: "wide"
                    },
                    {
                        src: '/pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png',
                        purpose: 'favicon'
                    },
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'favicon'
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'favicon'
                    },
                    {
                        src: '/apple-touch-icon-180x180.png',
                        sizes: '180x180',
                        type: 'image/png',
                        purpose: 'apple touch icon',
                    },
                    {
                        src: '/maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    }
                ],
                theme_color: '#171717',
                background_color: '#f0e7db',
                display: "standalone",
                scope: '/',
                start_url: "/",
                orientation: 'portrait',
            },
            injectRegister: 'auto',
        })
    ],
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
