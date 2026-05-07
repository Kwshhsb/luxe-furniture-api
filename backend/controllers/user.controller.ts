import db from "../config/db";

export const getCaregivers = (req: any, res: any) => {
  const { specialization } = req.query;
  let caregivers;
  if (specialization) {
    caregivers = db.prepare("SELECT id, name, specialization, experience, rating, avatar FROM users WHERE role = 'caregiver' AND specialization = ?").all(specialization);
  } else {
    caregivers = db.prepare("SELECT id, name, specialization, experience, rating, avatar FROM users WHERE role = 'caregiver'").all();
  }
  res.json(caregivers);
};

export const getProfile = (req: any, res: any) => {
  const user = db.prepare("SELECT id, name, email, role, phone, address, avatar, bio, experience, specialization, rating FROM users WHERE id = ?").get(req.user.id);
  res.json(user);
};

export const updateProfile = (req: any, res: any) => {
  const { name, phone, address, bio, avatar } = req.body;
  const update = db.prepare("UPDATE users SET name = ?, phone = ?, address = ?, bio = ?, avatar = ? WHERE id = ?");
  update.run(name, phone, address, bio, avatar, req.user.id);
  res.json({ success: true });
};

export const getAdminStats = (req: any, res: any) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  
  const stats = {
    totalUsers: db.prepare("SELECT COUNT(*) as count FROM users").get(),
    totalBookings: db.prepare("SELECT COUNT(*) as count FROM bookings").get(),
    revenue: db.prepare("SELECT SUM(total_price) as sum FROM bookings WHERE status = 'completed'").get(),
    pendingBookings: db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'").get(),
  };
  res.json(stats);
};

export const verifyCaregiver = (req: any, res: any) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Forbidden" });
  const update = db.prepare("UPDATE users SET rating = 5.0 WHERE id = ?");
  update.run(req.params.id);
  res.json({ success: true });
};
