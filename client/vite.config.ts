import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/siteprova/',
  plugins: [react()],
  root: process.cwd(),
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
  '@shared': path.resolve(__dirname, '..', 'shared'),
      '@components': path.resolve(process.cwd(), 'src', 'components'),
      '@hooks': path.resolve(process.cwd(), 'src', 'hooks'),
      '@pages': path.resolve(process.cwd(), 'src', 'pages'),
      '@lib': path.resolve(process.cwd(), 'src', 'lib'),
      '@assets': path.resolve(process.cwd(), 'public'),
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    assetsDir: 'assets'
  }
});
