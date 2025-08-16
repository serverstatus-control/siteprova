import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
// Removed duplicate import statement
import path from "path";
import { fileURLToPath } from 'url';
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

<<<<<<< HEAD
export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer()
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: "/siteprova/",
  build: {
    outDir: path.resolve(import.meta.dirname, "client", "dist"),
    emptyOutDir: true,
  },
=======
// https://vitejs.dev/config/
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Risolvi la root di build reale: se stai eseguendo i comandi dentro la cartella `client`
  // process.cwd() sarà già `.../client`, quindi usalo per risolvere gli alias in modo robusto.
  const projectRoot = process.cwd().endsWith(path.sep + 'client') || process.cwd().endsWith('/client')
    ? process.cwd()
    : path.resolve(__dirname, 'client');
  // Carica le variabili d'ambiente in base all'ambiente corrente (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/siteprova/',
    plugins: [
      react(),
      runtimeErrorOverlay(),
      themePlugin(),
      ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
        ? [
            (async () => {
              const m = await import("@replit/vite-plugin-cartographer");
              return m.cartographer();
            })(),
          ]
        : []),
    ],
    server: {
      port: 5173,
      import { defineConfig, loadEnv } from "vite";
      import react from "@vitejs/plugin-react";
      import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
      import path from "path";
      import { fileURLToPath } from 'url';
      import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

      // https://vitejs.dev/config/
      const __dirname = path.dirname(fileURLToPath(import.meta.url));

      export default defineConfig(({ mode }) => {
        // Risolvi la root di build reale: se stai eseguendo i comandi dentro la cartella `client`
        // process.cwd() sarà già `.../client`, quindi usalo per risolvere gli alias in modo robusto.
        const projectRoot = process.cwd().endsWith(path.sep + 'client') || process.cwd().endsWith('/client')
          ? process.cwd()
          : path.resolve(__dirname, 'client');

        // Carica variabili d'ambiente per l'ambiente corrente
        const env = loadEnv(mode, process.cwd(), '');

        return {
          base: '/siteprova/',
          plugins: [
            react(),
            runtimeErrorOverlay(),
            themePlugin(),
            ...(process.env.NODE_ENV !== "production" &&
            process.env.REPL_ID !== undefined
              ? [
                  (async () => {
                    const m = await import("@replit/vite-plugin-cartographer");
                    return m.cartographer();
                  })(),
                ]
              : []),
          ],
          server: {
            port: 5173,
            strictPort: true,
            proxy: {
              '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                ws: true
              }
            },
            hmr: { overlay: false },
            watch: {
              usePolling: true,
              ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
            },
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
            }
          },
          root: projectRoot,
          build: {
            outDir: 'dist',
            emptyOutDir: true,
            sourcemap: true,
            rollupOptions: {
              output: {
                manualChunks: {
                  vendor: ['react', 'react-dom'],
                  ui: [
                    '@radix-ui/react-accordion',
                    '@radix-ui/react-alert-dialog',
                    '@radix-ui/react-dialog',
                  ],
                }
              }
            },
            minify: 'terser',
            terserOptions: {
              compress: { drop_console: true, drop_debugger: true }
            },
            chunkSizeWarningLimit: 1000,
            assetsDir: 'assets',
          },
          optimizeDeps: { include: ['react', 'react-dom'] },
        };
      });
