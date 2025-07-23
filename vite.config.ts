// vite.config.ts (en tu proyecto frontend React)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Intercepta peticiones como /api/peliculas
        target: 'http://localhost:4000', // El puerto de tu backend
        changeOrigin: true,
        secure: false,
        // LA LÍNEA CRÍTICA:
        // Asegúrate que reescribe /api/peliculas a /peliculas (con el slash inicial)
        rewrite: (path) => path.replace(/^\/api/, '/'), // <-- ¡AJUSTA ESTA LÍNEA!
      },
    },
  },
});