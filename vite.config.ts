import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const projectRoot =
    process.cwd().endsWith(path.sep + 'client') || process.cwd().endsWith('/client')
      ? process.cwd()
      : path.resolve(__dirname, 'client');

  const env = loadEnv(mode, process.cwd(), '');
  
  // Configurazione base per GitHub Pages
  const isGithubPages = process.env.GITHUB_PAGES === 'true' || process.env.NODE_ENV === 'github-pages';
  const isProduction = mode === 'production';
  const base = (isGithubPages) ? '/siteprova/' : '/';

  return {
    base,
    plugins: [
      react(), 
      // Analisi del bundle solo in produzione
      ...(process.env.ANALYZE === 'true' ? [
        visualizer({
          filename: 'bundle-analysis.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        })
      ] : [])
    ],
    server: {
      port: 3000,
      strictPort: true,
      fs: {
        allow: ['.']
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
      // Gestisce correttamente il routing SPA 
      historyApiFallback: true,
      hmr: { overlay: false },
      watch: { usePolling: true, ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'] },
      cors: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(projectRoot, 'src'),
        '@shared': path.resolve(__dirname, 'shared'),
        '@assets': path.resolve(projectRoot, 'public'),
        '@components': path.resolve(projectRoot, 'src', 'components'),
        '@pages': path.resolve(projectRoot, 'src', 'pages'),
        '@styles': path.resolve(projectRoot, 'src', 'styles'),
        '@lib': path.resolve(projectRoot, 'src', 'lib'),
        '@hooks': path.resolve(projectRoot, 'src', 'hooks'),
      },
    },
    root: projectRoot,
    publicDir: path.resolve(projectRoot, 'public'),
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: process.env.NODE_ENV === 'development',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunks più granulari
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'react-query';
            }
            if (id.includes('wouter')) {
              return 'router';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons';
            }
            if (id.includes('zod') || id.includes('react-hook-form')) {
              return 'forms';
            }
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          // Ottimizzazione per file specifici
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      minify: 'terser',
      terserOptions: { 
        compress: { 
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug']
        } 
      },
      chunkSizeWarningLimit: 500,
      assetsDir: 'assets',
      target: 'esnext',
      reportCompressedSize: false,
    },
    optimizeDeps: { 
      include: [
        'react', 
        'react-dom', 
        'react/jsx-runtime',
        '@tanstack/react-query',
        'wouter',
        'lucide-react',
        'framer-motion',
        'zod',
        'react-hook-form'
      ],
      exclude: ['@fortawesome/fontawesome-free']
    },
  };
});
