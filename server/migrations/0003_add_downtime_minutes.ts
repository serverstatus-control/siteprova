import { sql } from 'drizzle-orm';
import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';

export async function up(db: any) {
  await db.execute(sql`
    ALTER TABLE uptime_history 
    ADD COLUMN IF NOT EXISTS downtime_minutes integer DEFAULT 0;
  `);
}

export async function down(db: any) {
  await db.execute(sql`
    ALTER TABLE uptime_history 
    DROP COLUMN IF EXISTS downtime_minutes;
  `);
}