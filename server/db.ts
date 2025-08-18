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