const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user"); // Import your User mode

// Configure options for the JWT authentication strategy
let jwtOpts = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header with Bearer token
    secretOrKey: process.env.JWT_SECRET, // Secret key to verify JWT signature
};

// const token = extractJWT.fromAuthHeaderAsBearerToken()(req.headers.authorization);

// Create a new JWT authentication strategy
passport.use(
    new JWTStrategy(jwtOpts, async function (jwtPayload, done) {
        try {
            // Attempt to find a user in the database based on the user ID stored in the JWT payload
            const user = await User.findById(jwtPayload._id);

            // If user not found, return failure to indicate unsuccessful authentication
            if (!user) {
                console.log("Error in finding user from JWT");
                return done(null, false);
            }

            // Attach the user object to the request for later access
            done(null, user);
        } catch (err) {
            // If an error occurs during database query or processing, log the error
            console.log("Error in finding user from JWT:", err);

            // Pass the error to the 'done' callback along with 'false' to indicate authentication failure
            return done(err, false);
        }
    })
);
module.exports = passport;
