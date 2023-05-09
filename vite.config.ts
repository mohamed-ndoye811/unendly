import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    publicDir:'./public',
    plugins: [vue(), VitePWA({
        filename: 'sw.js',
        srcDir: 'src/service-worker',
        injectRegister: 'script',
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        manifest: {
            "name": "Unendly",
            "short_name": "unendly",
            "start_url": "/",
            "display": "standalone",
            "theme_color": "#726DA8",
            "background_color": "#0D1317",
            "orientation": "landscape",
            "icons": [
                {
                    "src": "logo/icon.svg",
                    "sizes": "148x148",
                    "type": "image/svg+xml"
                }
            ]
        },
        workbox: {
            globPatterns: ["**/*"],
            maximumFileSizeToCacheInBytes: 5000000
        },
        includeAssets: [
            "**/*",
        ],
        devOptions: {
            enabled: true
        },
    })],
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss', '.d.ts'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./public', import.meta.url)),
        },
    },
})
