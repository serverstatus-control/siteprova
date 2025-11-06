import express, { type Express } from "express";
import fs from "fs";
import path from "path";

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
