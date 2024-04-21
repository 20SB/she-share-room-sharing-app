const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");

// Import the home controller
const rentalController = require("../controllers/rental_listing_controller");
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".png" &&
            ext !== ".PNG" &&
            ext !== ".gif"
        ) {
            return cb(new Error("Only images are allowed!"));
        }

        cb(null, true);
    },
});

// Route for the adding Servie
router.post(
    "/add-service",
    passport.authenticate("jwt", { session: false }),
    upload.array("files", 10),
    rentalController.addService
);

// Route for the Updating Servie
router.put(
    "/update-service",
    passport.authenticate("jwt", { session: false }),
    upload.array("files", 0),
    rentalController.updateService
);

// Route for the Adding More Images
router.put(
    "/add-image",
    passport.authenticate("jwt", { session: false }),
    upload.array("files", 10),
    rentalController.addImagesToService
);

// Route for the Adding More Images
router.put(
    "/remove-image",
    passport.authenticate("jwt", { session: false }),
    rentalController.removeImagesFromService
);

// Route for deleting the service
router.delete(
    "/delete-service",
    passport.authenticate("jwt", { session: false }),
    rentalController.deleteService
);

// Define route to get rental listings by city
router.get("/rental-list", rentalController.getRentalListingsByCity);

// Define route to get rental listings by city
router.get(
    "/my-rental-lists",
    passport.authenticate("jwt", { session: false }),
    rentalController.getRentalListingsOfaUser
);

// Export the main router to be used in your application
module.exports = router;
