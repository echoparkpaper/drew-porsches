import { Pool } from 'pg';

let ensured = false;

/**
 * Idempotently creates/upgrades the database schema. Safe to call on every
 * request that needs the DB — the actual work runs once per process.
 */
export async function ensureSchema() {
  if (ensured) return;

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS cars (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        make VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INTEGER NOT NULL,
        price DECIMAL(12, 2),
        mileage INTEGER,
        condition VARCHAR(20) NOT NULL,
        notes TEXT,
        valuation DECIMAL(12, 2),
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS car_photos (
        id UUID PRIMARY KEY,
        car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
        photo_url TEXT,
        caption TEXT,
        uploaded_at TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS maintenance_records (
        id UUID PRIMARY KEY,
        car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
        service_date DATE NOT NULL,
        description TEXT NOT NULL,
        cost DECIMAL(10, 2),
        mileage_at_service INTEGER,
        created_at TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS car_tags (
        id UUID PRIMARY KEY,
        car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
        tag VARCHAR(100) NOT NULL
      );

      -- Photo binary storage (uploaded car photos persist in Postgres so they
      -- survive Render's ephemeral filesystem across deploys/restarts).
      ALTER TABLE car_photos ADD COLUMN IF NOT EXISTS data BYTEA;
      ALTER TABLE car_photos ADD COLUMN IF NOT EXISTS content_type VARCHAR(100);
      ALTER TABLE car_photos ALTER COLUMN photo_url DROP NOT NULL;

      CREATE INDEX IF NOT EXISTS idx_cars_user_id ON cars(user_id);
      CREATE INDEX IF NOT EXISTS idx_car_photos_car_id ON car_photos(car_id);
      CREATE INDEX IF NOT EXISTS idx_maintenance_records_car_id ON maintenance_records(car_id);
      CREATE INDEX IF NOT EXISTS idx_car_tags_car_id ON car_tags(car_id);
    `);
    ensured = true;
  } finally {
    client.release();
    pool.end();
  }
}
