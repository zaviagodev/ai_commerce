import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Get migration name from command line args
const migrationName = process.argv[2];
if (!migrationName) {
  console.error('Please provide a migration name');
  process.exit(1);
}

// Create migrations directory if it doesn't exist
const migrationsDir = join(process.cwd(), 'src/lib/database/migrations');
if (!existsSync(migrationsDir)) {
  mkdirSync(migrationsDir, { recursive: true });
}

// Create migration file
const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
const filename = `${timestamp}_${migrationName}.sql`;
const filepath = join(migrationsDir, filename);

writeFileSync(filepath, '-- Migration: ' + migrationName + '\n\n');
console.log(`Created migration file: ${filename}`);