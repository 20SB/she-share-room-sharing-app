const mongoose = require("mongoose");

// Define a schema for the 'User' model
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        dp: {
            type: String,
        },
        age: {
            type: Number,
            min: 18,
            max: 120,
        },
        maritalStatus: {
            type: String,
            enum: ["Single", "Married", "Divorced", "Widowed", "Other"],
        },
        jobProfile: {
            type: String,
        },
        otherDetails: {
            type: String,
        },
        ratings: [
            {
                bookingId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Booking",
                },
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                feedback: {
                    type: String,
                },
            },
        ],
        averageRating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Middleware to calculate and update the average rating
userSchema.pre("save", function (next) {
    const ratingsCount = this.ratings.length;
    if (ratingsCount > 0) {
        const totalRating = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
        this.averageRating = totalRating / ratingsCount;
    } else {
        this.averageRating = 0;
    }
    next();
});

// Create a model named 'User' using the userSchema
const User = mongoose.model("User", userSchema);

// Export the 'User' model to be used in other parts of the application
module.exports = User;
