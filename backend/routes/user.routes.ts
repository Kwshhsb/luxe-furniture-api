import express from "express";
import { 
  getCaregivers, 
  getProfile, 
  updateProfile, 
  getAdminStats, 
  verifyCaregiver 
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.get("/caregivers", getCaregivers);
router.get("/users/profile", authenticateToken, getProfile);
router.put("/users/profile", authenticateToken, updateProfile);
router.get("/admin/stats", authenticateToken, getAdminStats);
router.put("/admin/verify-caregiver/:id", authenticateToken, verifyCaregiver);

export default router;
