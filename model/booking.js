import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show_Details",
        required: true
    },
    seats: {
        type: [String], // Example: ["E7", "E8"]
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Booking", bookingSchema);