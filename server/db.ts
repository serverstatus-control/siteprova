import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema.ts";
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;

// Require DATABASE_URL to be provided via environment (do not use hardcoded credentials)
if (!process.env.DATABASE_URL) {
  throw new Error("Environment variable DATABASE_URL is required. Set it in your hosting provider (Render, Neon, etc.) and do NOT commit credentials to the repo.");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

// Utility: in development, ensure the `favorites` table exists so developers
// don't hit runtime 42P01 errors when the database hasn't been migrated yet.
export async function ensureFavoritesTable() {
  if (process.env.NODE_ENV !== 'development') return;

  const sql = `
    CREATE TABLE IF NOT EXISTS favorites (
      id serial PRIMARY KEY,
      user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      service_id integer NOT NULL REFERENCES services(id) ON DELETE CASCADE,
      created_at timestamp DEFAULT now()
    );
  `;

  try {
    // Using pool.query directly because drizzle's typed API expects the schema
    // and the schema may be out-of-sync with the database until migrations run.
    await pool.query(sql);
    console.log('✅ ensureFavoritesTable: favorites table exists or was created');
  } catch (err) {
    console.error('Failed to ensure favorites table exists:', err);
    // don't throw here; we don't want to crash dev server because of this helper
  }
}