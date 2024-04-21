const mongoose = require("mongoose");

const rentalListingSchema = new mongoose.Schema(
    {
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        roomDetails: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        amenities: {
            type: [String],
            default: [],
        },
        rate: {
            type: Number,
            required: true,
        },
        minRentalTime: {
            type: Number,
            required: true,
        },
        maxRentalTime: {
            type: Number,
            required: true,
        },
        availableDates: {
            type: [Date],
            default: [],
        },
        images: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const RentalListing = mongoose.model("RentalListing", rentalListingSchema);

module.exports = RentalListing;
