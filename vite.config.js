import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  // TODO: убрать эту возню в проде, gh-pages использовать при внедрении не будем. Но пока
  // так. Подробнее тут: https://vite.dev/guide/static-deploy#github-pages
  const isProd = mode === 'production';

  return {
    base: isProd ? '/stolovaya_serv/' : '/',

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
