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
        // в utils кладите всё вспомогательное. Когда с архитектурой разберётесь —
        // достаньте это из ./db/
        // Пока так. Подробнее в ./db/README.md
        '@utils': path.resolve(__dirname, 'db/utils'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        // компоненты --> страницы --> маршруты в App.jsx
        '@components': path.resolve(__dirname, 'src/components'),
      },
    },
  };
});
