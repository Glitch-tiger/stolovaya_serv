import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],        // 👈 ПЛАГИНЫ НА ЭТОМ УРОВНЕ
  build: {
    outDir: 'build',        // 👈 ПАПКА ДЛЯ СБОРКИ
  }
});