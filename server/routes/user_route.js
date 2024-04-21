const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");

// Import the home controller
const userController = require("../controllers/user_controller");
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

// Route for the signUp
router.post("/sign-up", upload.single("dp"), userController.signUp);

// Route for the signIn
router.post("/sign-in", userController.signIn);

// Export the main router to be used in your application
module.exports = router;
