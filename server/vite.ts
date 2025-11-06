import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const clientRoot = path.resolve(import.meta.dirname, "..", "client");

  const serverOptions: any = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
    root: clientRoot,
  };

  const vite = await createViteServer({
    ...viteConfig,
    root: clientRoot,
    configFile: false,
    resolve: {
      alias: {
        '@': path.resolve(clientRoot, 'src'),
        '@shared': path.resolve(import.meta.dirname, '..', 'shared'),
        '@components': path.resolve(clientRoot, 'src', 'components'),
        '@hooks': path.resolve(clientRoot, 'src', 'hooks'),
        '@pages': path.resolve(clientRoot, 'src', 'pages'),
        '@lib': path.resolve(clientRoot, 'src', 'lib'),
        '@assets': path.resolve(clientRoot, 'public')
      }
    },
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(clientRoot, "index.html");

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      // support both absolute and relative script src in index.html
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      template = template.replace(
        `src="./src/main.tsx"`,
        `src="./src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Percorso della build client
  const distPath = path.resolve(import.meta.dirname, "..", "client", "dist");

  if (!fs.existsSync(distPath)) {
    console.warn(
      `[serveStatic] Static build directory not found: ${distPath}. Skipping static middleware.`,
    );
    return;
  }

  console.log(`[serveStatic] Serving static files from: ${distPath}`);

  // Serve i file statici per /assets/*
  app.use("/assets", express.static(path.join(distPath, "assets"), {
    maxAge: '1y',
    immutable: true
  }));

  // Serve favicon e altri asset statici
  app.use("/favicon.svg", express.static(path.join(distPath, "favicon.svg")));
  app.use("/favicon.png", express.static(path.join(distPath, "favicon.png")));
  app.use("/_redirects", express.static(path.join(distPath, "_redirects")));

  // Serve index.html solo per richieste SPA (non API)
  app.get("*", (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
