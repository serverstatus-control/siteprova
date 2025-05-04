import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema.ts";
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;

// Imposta la variabile d'ambiente se non è già definita
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://neondb_owner:npg_buVdpqR2TAl6@ep-rapid-shadow-a4kr56m7-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });