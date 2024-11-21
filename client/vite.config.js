import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase the warning threshold for chunk sizes
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: Splitting third-party libraries into separate chunks
          'react-query': ['@tanstack/react-query'],
          vendor: ['react', 'react-dom'], // Vendor libraries
        },
      },
    },
  },
});
