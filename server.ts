import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

import { initDb } from "./backend/config/db";
import authRoutes from "./backend/routes/auth.routes";
import bookingRoutes from "./backend/routes/booking.routes";
import serviceRoutes from "./backend/routes/service.routes";
import userRoutes from "./backend/routes/user.routes";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Database
initDb();

const app = express();
const PORT = 3000;

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.json());

// --- API ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api", userRoutes);
app.use("/api", bookingRoutes);

// Compatibility fallback for users/ profile if needed, but we moved to /api/users/profile
// Actually, I'll keep the paths consistent with how they were used in the controllers.

// --- VITE MIDDLEWARE ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
