import { sql } from 'drizzle-orm';
import { db } from '../db';

export async function up() {
  console.log('Creating password_resets table...');
  
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS password_resets (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log('✅ password_resets table created successfully');
}

export async function down() {
  console.log('Dropping password_resets table...');
  
  await db.execute(sql`
    DROP TABLE IF EXISTS password_resets;
  `);

  console.log('✅ password_resets table dropped');
}