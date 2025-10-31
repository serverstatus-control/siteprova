import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;

// Permette di lavorare senza DB in dev locale (quando Neon ha quota esaurita)
const DB_ENABLED = !!process.env.DATABASE_URL;

if (DB_ENABLED) {
  console.log('✅ Database connesso (Neon PostgreSQL)');
} else {
  console.log('⚠️  Database disabilitato - usando storage locale persistente (file) per dev');
}

export const pool = DB_ENABLED ? new Pool({ connectionString: process.env.DATABASE_URL }) : null;
export const db = DB_ENABLED && pool ? drizzle({ client: pool, schema }) : null;

// Utility: in development, ensure the `favorites` table exists so developers
// don't hit runtime 42P01 errors when the database hasn't been migrated yet.
export async function ensureFavoritesTable() {
  if (process.env.NODE_ENV !== 'development' || !pool) return;

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

// Utility: in development, ensure the `password_resets` table exists 
export async function ensurePasswordResetsTable() {
  if (process.env.NODE_ENV !== 'development' || !pool) return;

  const sql = `
    CREATE TABLE IF NOT EXISTS password_resets (
      id serial PRIMARY KEY,
      user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token text NOT NULL UNIQUE,
      expires_at timestamp NOT NULL,
      created_at timestamp DEFAULT now()
    );
  `;

  try {
    await pool.query(sql);
    console.log('✅ ensurePasswordResetsTable: password_resets table exists or was created');
  } catch (err) {
    console.error('Failed to ensure password_resets table exists:', err);
  }
}