import express from "express";
import {
    createRazorpayOrder,
    verifyPaymentAndBook,
    getBookingById
} from "../controllers/booking.controller.js";

const router = express.Router();

// Razorpay Order Generate karne ke liye
router.post("/create-order", createRazorpayOrder);

// Payment Verify aur DB me save karne ke liye
router.post("/verify-payment", verifyPaymentAndBook);

// Ticket Summary dekhne ke liye
router.get("/:id", getBookingById);

export default router;