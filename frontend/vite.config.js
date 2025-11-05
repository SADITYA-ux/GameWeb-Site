import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // allows imports like "@/components/Button"
    },
  },
  server: {
    port: 5173,          // dev server port
    open: true,          // automatically open browser
    strictPort: true,    // fail if port is taken
  },
  build: {
    sourcemap: true,     // enable source maps for easier debugging
  },
});
