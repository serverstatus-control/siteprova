import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode, command }) => {
  const projectRoot =
    process.cwd().endsWith(path.sep + "client") ||
    process.cwd().endsWith("/client")
      ? process.cwd()
      : path.resolve(__dirname, "client");

  const env = loadEnv(mode, process.cwd(), "");

  // Rileva ambiente Render
  const isRender =
    process.env.RENDER === "true" || !!process.env.RENDER_EXTERNAL_HOSTNAME;
  const isProduction = mode === "production";

  // Base sempre '/' (solo Netlify)
  const cmd = String(command) as "serve" | "build" | "preview";
  const isBuildOrPreview = cmd === "build" || cmd === "preview";
  const isServe = cmd === "serve";
  
  // Base path configuration
  const explicitBase = process.env.VITE_PUBLIC_BASE;
  const base = explicitBase || "/";

  return {
    base,
    plugins: [
      react(),
      // Analisi del bundle solo in produzione
      ...(process.env.ANALYZE === "true"
        ? [
            visualizer({
              filename: "bundle-analysis.html",
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
    server: {
      port: 3000,
      strictPort: true,
      fs: {
        allow: ["."],
      },
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
        },
      },
      // Gestisce correttamente il routing SPA
      historyApiFallback: true,
      hmr: { 
        overlay: true,
        port: 3000
      },
      watch: {
        usePolling: false,
        ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
      },
      cors: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(projectRoot, "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(projectRoot, "public"),
        "@components": path.resolve(projectRoot, "src", "components"),
        "@pages": path.resolve(projectRoot, "src", "pages"),
        "@styles": path.resolve(projectRoot, "src", "styles"),
        "@lib": path.resolve(projectRoot, "src", "lib"),
        "@hooks": path.resolve(projectRoot, "src", "hooks"),
      },
      // Evita duplicati di React che possono causare errori HMR e optimize deps
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    root: projectRoot,
    publicDir: path.resolve(projectRoot, "public"),
    build: {
      // Output sempre in dist per semplicità
      outDir: "dist",
    assetsDir: "assets",
    manifest: false,
      emptyOutDir: true,
      sourcemap: process.env.NODE_ENV === "development",
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor chunks più granulari per splitting ottimale
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("@radix-ui")) {
              return "radix-ui";
            }
            if (id.includes("@tanstack/react-query")) {
              return "react-query";
            }
            if (id.includes("wouter")) {
              return "router";
            }
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            if (id.includes("lucide-react") || id.includes("react-icons")) {
              return "icons";
            }
            if (id.includes("zod") || id.includes("react-hook-form") || id.includes("@hookform")) {
              return "forms";
            }
            // UI components separati per lazy loading
            if (id.includes("/components/ui/")) {
              return "ui-components";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          // Ottimizzazione per file specifici con naming migliore
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') ?? [];
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/img/[name]-[hash].[ext]`;
            }
            if (/woff2?|ttf|otf|eot/i.test(ext)) {
              return `assets/fonts/[name]-[hash].[ext]`;
            }
            return `assets/[ext]/[name]-[hash].[ext]`;
          },
        },
      },
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === "production",
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info", "console.debug"],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
      },
  chunkSizeWarningLimit: 500,
  target: "esnext",
  reportCompressedSize: false,
  cssCodeSplit: true,
    },
    optimizeDeps: {
      // Pre-bundle dependencies per ridurre i round-trip
      include: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "wouter",
        "lucide-react",
        "framer-motion",
        "zod",
        "react-hook-form",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-select",
        "@radix-ui/react-tooltip",
        "date-fns",
      ],
      exclude: ["@fortawesome/fontawesome-free"],
      esbuildOptions: {
        target: 'esnext'
      },
      entries: ['client/src/main.tsx']
    },
    cacheDir: '.vite-cache',
  };
});
