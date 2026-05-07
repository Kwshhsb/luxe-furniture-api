import express from "express";
import { 
  createBooking, 
  getMyBookings, 
  updateBookingStatus, 
  addCareNote, 
  getCareNotes 
} from "../controllers/booking.controller";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/bookings", authenticateToken, createBooking);
router.get("/bookings/my", authenticateToken, getMyBookings);
router.put("/bookings/:id/status", authenticateToken, updateBookingStatus);
router.post("/carenotes", authenticateToken, addCareNote);
router.get("/carenotes/:bookingId", authenticateToken, getCareNotes);

export default router;
