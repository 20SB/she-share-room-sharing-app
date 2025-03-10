require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passportJWT = require("./config/passport");
const MongoStore = require('connect-mongo');

// Require database configuration
const db = require("./config/mongoose");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: `${process.env.MONGODB_URI}she-share`,
          ttl: 14 * 24 * 60 * 60 // 14 days
        })
    })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use(
//     cors({
//         origin: "*",
//         methods: "GET,POST,PUT,DELETE",
//         credentials: true,
//     })
// );

// Use express router for routing
app.use("/", require("./routes"));

app.listen(port, () => {
    console.log("SHE SHARE Server runing on port: ", port);
});
module.exports = app;