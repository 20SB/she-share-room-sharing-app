const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import the home controller
const bookingController = require("../controllers/booking_controller");

// Route for the adding Servie
router.post(
    "/book-service",
    passport.authenticate("jwt", { session: false }),
    bookingController.bookService
);

// Route for adding guest response
router.put(
    "/guest-res",
    passport.authenticate("jwt", { session: false }),
    bookingController.guestResponse
);
// Route for adding guest response
router.put(
    "/host-res",
    passport.authenticate("jwt", { session: false }),
    bookingController.hostResponse
);

router.put(
    "/update-transaction",
    passport.authenticate("jwt", { session: false }),
    bookingController.updateTransactionStatus
);

// Route for adding review
router.put(
    "/review",
    passport.authenticate("jwt", { session: false }),
    bookingController.addReview
);

// Route for viewing all bookings of a user
router.get(
    "/as-guest",
    passport.authenticate("jwt", { session: false }),
    bookingController.getBookingsAsGuest
);

// Route for viewing all bookings of a user
router.get(
    "/as-host",
    passport.authenticate("jwt", { session: false }),
    bookingController.getHostBookings
);

// Export the main router to be used in your application
module.exports = router;
