const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rentalListing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RentalListing",
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    totalPriceCalculated: {
        type: Number,
        required: true,
    },
    guestRes: {
        type: String,
        enum: ["Pending", "Cancelled", "Confirmed"],
        default: "Pending",
    },
    hostRes: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    transaction: {
        type: String,
        enum: ["Not Attempted", "Pending", "Failed", "Successfull"],
        default: "Not Attempted",
    },
    guestExperience: {
        type: String,
        default: "",
    },
    hostExperience: {
        type: String,
        default: "",
    },
    guestRating: {
        type: Number,
        min: 1,
        max: 5,
    },
    hostRating: {
        type: Number,
        min: 1,
        max: 5,
    },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
