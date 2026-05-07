import db from "../config/db";

export const createBooking = (req: any, res: any) => {
  const { caregiverId, serviceId, bookingDate, duration, notes, totalPrice } = req.body;
  const id = Math.random().toString(36).substring(7);
  const customerId = req.user.id;

  const insert = db.prepare("INSERT INTO bookings (id, customer_id, caregiver_id, service_id, booking_date, duration, notes, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  insert.run(id, customerId, caregiverId, serviceId, bookingDate, duration, notes, totalPrice);
  res.json({ id, status: "pending" });
};

export const getMyBookings = (req: any, res: any) => {
  const userId = req.user.id;
  const role = req.user.role;
  let bookings;

  if (role === 'customer') {
    bookings = db.prepare(`
      SELECT b.*, u.name as caregiver_name, s.name as service_name 
      FROM bookings b
      JOIN users u ON b.caregiver_id = u.id
      JOIN services s ON b.service_id = s.id
      WHERE b.customer_id = ?
      ORDER BY b.created_at DESC
    `).all(userId);
  } else {
    bookings = db.prepare(`
      SELECT b.*, u.name as customer_name, s.name as service_name 
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      JOIN services s ON b.service_id = s.id
      WHERE b.caregiver_id = ?
      ORDER BY b.created_at DESC
    `).all(userId);
  }
  res.json(bookings);
};

export const updateBookingStatus = (req: any, res: any) => {
  const { status } = req.body;
  const bookingId = req.params.id;
  const userId = req.user.id;

  const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(bookingId) as any;
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  if (booking.customer_id !== userId && booking.caregiver_id !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const update = db.prepare("UPDATE bookings SET status = ? WHERE id = ?");
  update.run(status, bookingId);
  res.json({ success: true, status });
};

export const addCareNote = (req: any, res: any) => {
  const { bookingId, notes, healthUpdate } = req.body;
  const id = Math.random().toString(36).substring(7);

  if (req.user.role !== 'caregiver') return res.status(403).json({ error: "Only caregivers can add notes" });

  const insert = db.prepare(`
    INSERT INTO care_notes (id, booking_id, notes, health_update, created_at) 
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);
  insert.run(id, bookingId, notes, healthUpdate);
  res.json({ success: true, id });
};

export const getCareNotes = (req: any, res: any) => {
  const notes = db.prepare("SELECT * FROM care_notes WHERE booking_id = ? ORDER BY created_at DESC").all(req.params.bookingId);
  res.json(notes);
};
