import { Pool } from 'pg';
import { Car, CarPhoto, MaintenanceRecord, User } from '@/types';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = {
  // User operations
  async getUserByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  },

  async getUserById(id: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async createUser(email: string, password_hash: string): Promise<User> {
    const id = crypto.randomUUID();
    const now = new Date();
    const result = await pool.query(
      'INSERT INTO users (id, email, password_hash, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, email, password_hash, now, now]
    );
    return result.rows[0];
  },

  // Car operations
  async getCars(userId: string): Promise<Car[]> {
    const result = await pool.query(
      'SELECT * FROM cars WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  },

  async getCarById(id: string, userId: string): Promise<Car | null> {
    const result = await pool.query(
      'SELECT * FROM cars WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0] || null;
  },

  async createCar(
    userId: string,
    data: Omit<Car, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ): Promise<Car> {
    const id = crypto.randomUUID();
    const now = new Date();
    const result = await pool.query(
      `INSERT INTO cars (id, user_id, make, model, year, price, mileage, condition, notes, valuation, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [id, userId, data.make, data.model, data.year, data.price, data.mileage, data.condition, data.notes, data.valuation, now, now]
    );
    return result.rows[0];
  },

  async updateCar(
    id: string,
    userId: string,
    data: Partial<Omit<Car, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
  ): Promise<Car | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      updates.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    });

    updates.push(`updated_at = $${paramIndex}`);
    values.push(new Date());
    paramIndex++;

    values.push(id);
    values.push(userId);

    const result = await pool.query(
      `UPDATE cars SET ${updates.join(', ')} WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  },

  async deleteCar(id: string, userId: string): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM cars WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return (result.rowCount ?? 0) > 0;
  },

  // Photo operations
  async getCarPhotos(carId: string): Promise<CarPhoto[]> {
    const result = await pool.query(
      'SELECT * FROM car_photos WHERE car_id = $1 ORDER BY uploaded_at DESC',
      [carId]
    );
    return result.rows;
  },

  async addPhoto(carId: string, photoUrl: string, caption?: string): Promise<CarPhoto> {
    const id = crypto.randomUUID();
    const result = await pool.query(
      'INSERT INTO car_photos (id, car_id, photo_url, caption, uploaded_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, carId, photoUrl, caption || null, new Date()]
    );
    return result.rows[0];
  },

  async deletePhoto(id: string, carId: string): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM car_photos WHERE id = $1 AND car_id = $2',
      [id, carId]
    );
    return (result.rowCount ?? 0) > 0;
  },

  // Maintenance operations
  async getMaintenanceRecords(carId: string): Promise<MaintenanceRecord[]> {
    const result = await pool.query(
      'SELECT * FROM maintenance_records WHERE car_id = $1 ORDER BY service_date DESC',
      [carId]
    );
    return result.rows;
  },

  async addMaintenanceRecord(
    carId: string,
    data: Omit<MaintenanceRecord, 'id' | 'car_id' | 'created_at'>
  ): Promise<MaintenanceRecord> {
    const id = crypto.randomUUID();
    const result = await pool.query(
      `INSERT INTO maintenance_records (id, car_id, service_date, description, cost, mileage_at_service, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id, carId, data.service_date, data.description, data.cost, data.mileage_at_service, new Date()]
    );
    return result.rows[0];
  },

  async deleteMaintenanceRecord(id: string, carId: string): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM maintenance_records WHERE id = $1 AND car_id = $2',
      [id, carId]
    );
    return (result.rowCount ?? 0) > 0;
  },
};
