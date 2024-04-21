const Booking = require("../models/booking");
const RentalListing = require("../models/rentalListing");

module.exports.bookService = async (req, res) => {
    try {
        const guest = req.user;
        const { rentalListingId } = req.query;
        const { checkInDate, checkOutDate } = req.body;

        // Find the rental listing
        const rentalListing = await RentalListing.findById(rentalListingId);
        if (!rentalListing) {
            return res.status(404).json({ message: "Rental listing not found" });
        }

        // Calculate total price based on rental rate and booking duration
        const rate = rentalListing.rate;
        const numDays = Math.ceil(
            (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
        );
        const totalPriceCalculated = rate * numDays;

        // Create a new booking record
        const newBooking = new Booking({
            guest,
            host: rentalListing.host,
            rentalListing: rentalListingId,
            checkInDate,
            checkOutDate,
            totalPriceCalculated,
        });

        // Save the booking record
        const savedBooking = await newBooking.save();

        return res.status(201).json({
            message: "Booking request submitted successfully",
            booking: savedBooking,
        });
    } catch (error) {
        console.error("Error booking service:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.updateBookingByGuest = async (req, res) => {
    try {
        const { bookingId } = req.query;
        const { checkInDate, checkOutDate } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { checkInDate, checkOutDate },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
    } catch (error) {
        console.error("Error updating booking by guest:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.hostResponse = async (req, res) => {
    try {
        const { bookingId } = req.query;
        const { hostRes } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { hostRes },
            { new: true }
        );

        res.status(200).json({
            message: "Host response updated successfully",
            booking: updatedBooking,
        });
    } catch (error) {
        console.error("Error updating host response:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.guestResponse = async (req, res) => {
    try {
        const { bookingId } = req.query;
        const { guestRes } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { guestRes },
            { new: true }
        );
        res.status(200).json({
            message: "Guest response updated successfully",
            booking: updatedBooking,
        });
    } catch (error) {
        console.error("Error updating guest response:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.updateTransactionStatus = async (req, res) => {
    try {
        const { bookingId } = req.query;
        const { transactionStatus } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { transaction: transactionStatus },
            { new: true }
        );
        res.status(200).json({
            message: "Guest response updated successfully",
            booking: updatedBooking,
        });
    } catch (error) {
        console.error("Error updating guest response:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.addReview = async (req, res) => {
    try {
        const { bookingId } = req.query;
        const { reviewComment, rating } = req.body;

        // Find the booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Ensure the current user is either the guest or the host of the booking
        const user = req.user;
        if (!booking.guest.equals(user._id) && !booking.host.equals(user._id)) {
            return res.status(403).json({ message: "Unauthorized to add review for this booking" });
        }

        // Validate the rating (assuming it should be between 1 and 5)
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        // Determine if guest or host is adding the review
        if (booking.guest.equals(user._id)) {
            // Guest's review
            booking.guestExperience = reviewComment;
            booking.guestRating = rating;
        } else if (booking.host.equals(user._id)) {
            // Host's review
            booking.hostExperience = reviewComment;
            booking.hostRating = rating;
        }
        user.ratings.push({
            bookingId,
            rating,
            feedback: reviewComment,
        });
        await user.save();

        // Save updated booking
        const updatedBooking = await booking.save();

        res.status(200).json({ message: "Review added successfully", booking: updatedBooking });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getBookingDetails = async (req, res) => {
    try {
        const { bookingId } = req.query;

        // Find the booking and populate related fields
        const booking = await Booking.findById(bookingId)
            .populate("guest", "-password")
            .populate("host", "-password ")
            .populate("rentalListing");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking Data Fetched Successfully", booking });
    } catch (error) {
        console.error("Error getting booking details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getBookingsAsGuest = async (req, res) => {
    try {
        // console.log("reached booking api");
        const user = req.user;

        // Find bookings where the user is the guest
        const guestBookings = await Booking.find({ guest: user._id })
            .populate("host", "-password")
            .populate("rentalListing");

        res.status(200).json({ bookings: guestBookings });
    } catch (error) {
        console.error("Error fetching guest bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.getHostBookings = async (req, res) => {
    try {
        const user = req.user;

        // Find all rental listings where the host is the user
        const rentalListings = await RentalListing.find({ host: user._id });

        // Map each rental listing to include associated bookings
        const rentalListingsWithBookings = await Promise.all(
            rentalListings.map(async (rentalListing) => {
                // Find all bookings for this rentalListing where host is user._id
                const bookings = await Booking.find({
                    rentalListing: rentalListing._id,
                    host: user._id,
                }).populate("guest", "-password");

                // Return rentalListing object with associated bookings
                return {
                    ...rentalListing.toObject(),
                    bookings: bookings,
                };
            })
        );

        res.status(200).json({ rentalListingsWithBookings });
    } catch (error) {
        console.error("Error fetching host bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
