const mongoose = require("mongoose");

//connect to the database
// mongoose.connect("mongodb://127.0.0.1/users");

const DB = `${process.env.MONGODB_URI}she-share`;

mongoose.connect(DB, {});

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on("error", function (err) {
    console.log(err.message);
});

//up and running then print the message
db.once("open", function () {
    console.log(`Successfully connected to the She Share database :: MongoDB`);
});

module.exports = db;
