export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface Car {
  id: string;
  user_id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  notes: string;
  valuation: number;
  created_at: Date;
  updated_at: Date;
}

export interface CarPhoto {
  id: string;
  car_id: string;
  photo_url?: string | null;
  content_type?: string | null;
  caption?: string | null;
  uploaded_at: Date;
}

export interface MaintenanceRecord {
  id: string;
  car_id: string;
  service_date: Date;
  description: string;
  cost: number;
  mileage_at_service: number;
  created_at: Date;
}

export interface CarTag {
  id: string;
  car_id: string;
  tag: string;
}

export interface Session {
  user: {
    id: string;
    email: string;
  };
}
