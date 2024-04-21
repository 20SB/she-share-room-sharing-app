const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const awsS3 = require("../config/aws");

module.exports.signUp = async (req, res) => {
    try {
        const { email, password, name, age, maritalStatus, jobProfile, otherDetails } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already Registered" });
        }

        let dp = "";
        if (req.file) {
            const fileType = "DP";
            const data = await awsS3.upload(fileType, req.file);
            dp = data.Location;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            dp,
            age,
            maritalStatus,
            jobProfile,
            otherDetails,
        });
        const user = await newUser.save();

        // Generate JWT token
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res.status(201).json({
            message: "Sign Up Successful",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    dp: user.dp,
                    age: user.age,
                    maritalStatus: user.maritalStatus,
                    jobProfile: user.jobProfile,
                    otherDetails: user.otherDetails,
                },
                token,
            },
        });
    } catch (error) {
        console.error("Error in signUp:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res.status(200).json({
            message: "SignIn successfully",
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    dp: user.dp,
                    age: user.age,
                    maritalStatus: user.maritalStatus,
                    jobProfile: user.jobProfile,
                    otherDetails: user.otherDetails,
                },
                token,
            },
        });
    } catch (error) {
        console.error("Error in signIn:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.addMoreUserData = async (req, res) => {
    try {
        const { age, maritalStatus, jobProfile, otherDetails } = req.body;
        const userId = req.user._id;

        // Find the user by ID and update additional details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                age,
                maritalStatus,
                jobProfile,
                otherDetails,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
