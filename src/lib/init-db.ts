import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initializeDatabase() {
  const client = await pool.connect();

  try {
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      );
    `);

    // Create cars table
    await client.query(`
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
    `);

    // Create car_photos table
    await client.query(`
      CREATE TABLE IF NOT EXISTS car_photos (
        id UUID PRIMARY KEY,
        car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
        photo_url TEXT NOT NULL,
        caption TEXT,
        uploaded_at TIMESTAMP NOT NULL
      );
    `);

    // Create maintenance_records table
    await client.query(`
      CREATE TABLE IF NOT EXISTS maintenance_records (
        id UUID PRIMARY KEY,
        car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
        service_date DATE NOT NULL,
        description TEXT NOT NULL,
        cost DECIMAL(10, 2),
        mileage_at_service INTEGER,
        created_at TIMESTAMP NOT NULL
      );
    `);

    // Create car_tags table
    await client.query(`
      CREATE TABLE IF NOT EXISTS car_tags (
        id UUID PRIMARY KEY,
        car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
        tag VARCHAR(100) NOT NULL
      );
    `);

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_cars_user_id ON cars(user_id);
      CREATE INDEX IF NOT EXISTS idx_car_photos_car_id ON car_photos(car_id);
      CREATE INDEX IF NOT EXISTS idx_maintenance_records_car_id ON maintenance_records(car_id);
      CREATE INDEX IF NOT EXISTS idx_car_tags_car_id ON car_tags(car_id);
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  } finally {
    client.release();
  }
}
