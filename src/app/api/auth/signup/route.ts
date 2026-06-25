import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { Pool } from 'pg';

const initializeDatabase = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

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
        photo_url TEXT NOT NULL,
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

      CREATE INDEX IF NOT EXISTS idx_cars_user_id ON cars(user_id);
      CREATE INDEX IF NOT EXISTS idx_car_photos_car_id ON car_photos(car_id);
      CREATE INDEX IF NOT EXISTS idx_maintenance_records_car_id ON maintenance_records(car_id);
      CREATE INDEX IF NOT EXISTS idx_car_tags_car_id ON car_tags(car_id);
    `);
  } finally {
    client.release();
    pool.end();
  }
};

export async function POST(request: NextRequest) {
  try {
    await initializeDatabase();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(email, hashedPassword);

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
