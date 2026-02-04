import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@pages': path.resolve(__dirname, 'src/pages'),
      },
    },
  };
});
