import { up } from './0004_add_password_resets';

async function runMigration() {
  try {
    console.log('🚀 Running password_resets migration...');
    await up();
    console.log('✅ Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();