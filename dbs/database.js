const mongoose = require("mongoose");

const connection = mongoose
    .connect(process.env.URL)
    .then(console.log("connected to database"));

module.exports = connection;
