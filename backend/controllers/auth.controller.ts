import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export const register = (req: any, res: any) => {
  const { name, email, password, role } = req.body;
  const id = Math.random().toString(36).substring(7);
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const insert = db.prepare("INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)");
    insert.run(id, name, email, hashedPassword, role);
    const token = jwt.sign({ id, email, role }, JWT_SECRET);
    res.json({ token, user: { id, name, email, role } });
  } catch (e: any) {
    res.status(400).json({ error: "Email already exists" });
  }
};

export const login = (req: any, res: any) => {
  const { email, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
