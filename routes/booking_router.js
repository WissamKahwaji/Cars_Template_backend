import express from "express";
import { addBooking, getAllBookings, getBookingsByUser } from "../controllers/booking_ctrl.js";



const router = express.Router();

router.get('/all', getAllBookings);
router.get('/by-user/:userId', getBookingsByUser);
router.post('/add', addBooking);

export default router;