import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { checkAllServices } from './service-checker';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure CORS: allow single origin or multiple origins via comma-separated env var
const allowedOriginsRaw = process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || "";
const allowedOrigins = allowedOriginsRaw.split(",").map(s => s.trim()).filter(Boolean);

// Add default allowed origins for deployment
const defaultAllowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://serverstatus-control.github.io",
  "https://siteprova.onrender.com"
];

const finalAllowedOrigins = allowedOrigins.length > 0 ? allowedOrigins : defaultAllowedOrigins;

app.use(cors({
  origin: (origin: string | undefined | null, callback: (err: Error | null, allow?: boolean) => void) => {
    // allow requests with no origin like curl/postman
    if (!origin) return callback(null, true);
    
    console.log('CORS check for origin:', origin);
    console.log('Allowed origins:', finalAllowedOrigins);
    
    // More flexible matching for GitHub Pages subpaths
    const isAllowed = finalAllowedOrigins.some(allowed => {
      // Exact match
      if (origin === allowed) return true;
      // GitHub Pages allows subpaths (/siteprova)
      if (allowed === "https://serverstatus-control.github.io" && origin.startsWith("https://serverstatus-control.github.io")) return true;
      return false;
    });
    
    if (isAllowed) {
      console.log('CORS allowed for:', origin);
      return callback(null, true);
    }
    
    console.log('CORS rejected for:', origin);
    callback(new Error("CORS not allowed by server"));
  },
  credentials: true
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Intervallo di controllo in millisecondi (20 minuti)
const CHECK_INTERVAL = 20 * 60 * 1000;
let isChecking = false;
let nextCheckTimeout: NodeJS.Timeout;

async function scheduleNextCheck() {
  if (nextCheckTimeout) {
    clearTimeout(nextCheckTimeout);
  }
  
  nextCheckTimeout = setTimeout(runCheck, CHECK_INTERVAL);
}

async function runCheck() {
  if (isChecking) {
    console.log("Un controllo è già in corso, salto questo intervallo");
    scheduleNextCheck();
    return;
  }

  isChecking = true;
  try {
    console.log("Esecuzione controllo automatico dei servizi...");
    await checkAllServices();
    console.log("Controllo automatico completato");
  } catch (error) {
    console.error("Errore durante il controllo automatico:", error);
  } finally {
    isChecking = false;
    scheduleNextCheck();
  }
}

(async () => {
  const server = await registerRoutes(app);
  // In development, ensure the favorites table exists to avoid 42P01 errors
  try {
    if (process.env.NODE_ENV === 'development') {
      // import lazily to avoid circular deps at module load time
      const { ensureFavoritesTable, ensurePasswordResetsTable } = await import('./db');
      await ensureFavoritesTable();
      await ensurePasswordResetsTable();
    }
  } catch (err) {
    console.error('Error while ensuring dev DB schema:', err);
  }

  // Avvia il sistema di controllo automatico
  console.log("Avvio del sistema di controllo automatico dei servizi ogni 20 minuti!");
  
  // Non eseguire il controllo iniziale immediato: avvia il primo controllo dopo l'intervallo configurato
  console.log("Primo controllo automatico programmato tra 20 minuti!");
  scheduleNextCheck();

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
  // Log the error but do not rethrow: rethrowing here will crash the server process
  // and cause the platform (Render) to return 502/Bad Gateway to clients.
  console.error('Unhandled error handled by middleware:', err);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
