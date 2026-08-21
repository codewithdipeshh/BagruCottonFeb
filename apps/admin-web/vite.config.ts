import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5174,
  },
  resolve: {
    alias: {
      '@bagru/ui': path.resolve(__dirname, '../..', 'packages/ui/src'),
      '@bagru/types': path.resolve(__dirname, '../..', 'packages/types/src'),
      '@bagru/utils': path.resolve(__dirname, '../..', 'packages/utils/src'),
    },
  },
});
