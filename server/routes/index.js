const express = require("express");
const router = express.Router();

// Import the home controller
const homeController = require("../controllers/home_controller");

// Route for the home page
router.get("/", homeController.home);

router.use("/user", require("./user_route"));
router.use("/rental", require("./rental_routes"));
router.use("/booking", require("./booking"));

// Export the main router to be used in your application
module.exports = router;
