import Database from "better-sqlite3";
import bcrypt from "bcryptjs";

const db = new Database("eldercare.db");
db.pragma("journal_mode = WAL");

export const initDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('admin', 'caregiver', 'customer')) NOT NULL,
      phone TEXT,
      address TEXT,
      avatar TEXT,
      bio TEXT,
      experience INTEGER,
      specialization TEXT,
      rating REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      base_price REAL,
      category TEXT CHECK(category IN ('Nursing', 'Caregiver', 'Physiotherapy', 'Doctor')) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      caregiver_id TEXT NOT NULL,
      service_id TEXT NOT NULL,
      status TEXT CHECK(status IN ('pending', 'confirmed', 'ongoing', 'completed', 'cancelled')) DEFAULT 'pending',
      booking_date DATETIME NOT NULL,
      duration TEXT,
      total_price REAL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(customer_id) REFERENCES users(id),
      FOREIGN KEY(caregiver_id) REFERENCES users(id),
      FOREIGN KEY(service_id) REFERENCES services(id)
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL,
      rating INTEGER CHECK(rating BETWEEN 1 AND 5),
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(booking_id) REFERENCES bookings(id)
    );

    CREATE TABLE IF NOT EXISTS care_notes (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL,
      notes TEXT,
      health_update TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(booking_id) REFERENCES bookings(id)
    );
  `);

  // Seed initial services if empty
  const serviceCount = db.prepare("SELECT COUNT(*) as count FROM services").get() as { count: number };
  if (serviceCount.count === 0) {
    const insertService = db.prepare("INSERT INTO services (id, name, description, base_price, category) VALUES (?, ?, ?, ?, ?)");
    insertService.run("s1", "General Nursing Care", "24/7 skilled nursing support for medical needs.", 2500, "Nursing");
    insertService.run("s2", "Elderly Caretaking", "Daily assistance with mobility, hygiene, and companionship.", 1200, "Caregiver");
    insertService.run("s3", "Physical Therapy", "Specialized recovery sessions for mobility and pain management.", 1800, "Physiotherapy");
    insertService.run("s4", "Critical Care Nursing", "ICU-level care at home for critical patients.", 4500, "Nursing");
  }

  // Global Caregiver Seed
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'caregiver'").get() as { count: number };
  if (userCount.count === 0) {
    const hash = bcrypt.hashSync("password123", 10);
    const insertUser = db.prepare("INSERT INTO users (id, name, email, password, role, specialization, experience, rating, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    insertUser.run("c1", "Sarah Johnson", "sarah@eldercare.com", hash, "caregiver", "Critical Nursing", 8, 4.8, "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80");
    insertUser.run("c2", "Michael Chen", "michael@eldercare.com", hash, "caregiver", "Physiotherapy", 5, 4.9, "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80");
  }
};

export default db;
