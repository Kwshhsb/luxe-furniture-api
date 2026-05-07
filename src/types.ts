export type Role = 'admin' | 'caregiver' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  address?: string;
  avatar?: string;
  bio?: string;
  experience?: number;
  specialization?: string;
  rating?: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  base_price: number;
  category: 'Nursing' | 'Caregiver' | 'Physiotherapy' | 'Doctor';
}

export type BookingStatus = 'pending' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customer_id: string;
  caregiver_id: string;
  service_id: string;
  status: BookingStatus;
  booking_date: string;
  duration: string;
  total_price: number;
  notes?: string;
  caregiver_name?: string;
  customer_name?: string;
  service_name?: string;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
