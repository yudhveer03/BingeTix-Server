import Razorpay from "razorpay";
import crypto from "crypto";
import bookingModel from "../model/booking.js";
import showModel from "../model/show.js";

// 1. Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
    try {
        // Razorpay ko .env ki values yahan function ke andar de rahe hain
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const { totalAmount } = req.body;

        if (!totalAmount) {
            return res.status(400).json({ message: "Amount is required" });
        }

        const options = {
            amount: totalAmount * 100, // Amount paise mein
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            order,
            key_id: process.env.RAZORPAY_KEY_ID
        });
    } catch (err) {
        console.error("Error creating Razorpay order:", err);
        res.status(500).json({ message: "Error creating payment order" });
    }
};

// 2. Verify Payment & Save Booking in Database
export const verifyPaymentAndBook = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            movieId,
            showId,
            seats,
            totalAmount
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isSignatureValid = expectedSignature === razorpay_signature;

        if (isSignatureValid) {
            const newBooking = new bookingModel({
                movieId,
                showId,
                seats,
                totalAmount
            });
            await newBooking.save();

            await showModel.findByIdAndUpdate(showId, {
                $push: { bookedSeats: { $each: seats } }
            });

            return res.status(201).json({
                message: "Payment Verified & Booking Successful!",
                booking: newBooking
            });
        } else {
            return res.status(400).json({ message: "Invalid Payment Signature!" });
        }
    } catch (err) {
        console.error("Payment Verification Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// 3. Get Booking Details By ID
export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingModel.findById(id)
            .populate('movieId')
            .populate('showId');

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (err) {
        console.error("Error fetching booking:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};