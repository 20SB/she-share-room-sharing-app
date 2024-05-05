const express = require("express");
const router = express.Router();
const passport = require("passport");

const paymentController = require("../controllers/payment_controller");

router.post("/", paymentController.createOrder);

// Export the main router to be used in your application
module.exports = router;
