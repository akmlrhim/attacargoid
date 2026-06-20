import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: ['resources/views/**', 'routes/**'],
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
    build: {
        chunkSizeWarningLimit: 600,
        rolldownOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
                        return 'vendor-react';
                    }
                    if (id.includes('node_modules/@inertiajs')) {
                        return 'vendor-inertia';
                    }
                    if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) {
                        return 'vendor-gsap';
                    }
                    if (id.includes('node_modules/motion')) {
                        return 'vendor-motion';
                    }
                    if (id.includes('node_modules/lenis')) {
                        return 'vendor-lenis';
                    }
                    if (id.includes('node_modules/three') || id.includes('node_modules/ogl') || id.includes('node_modules/gl-matrix')) {
                        return 'vendor-3d';
                    }
                },
            },
        },
    },
});
