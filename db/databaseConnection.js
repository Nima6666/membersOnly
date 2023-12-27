const mongoose = require("mongoose")


mongoose.connect(process.env.URL).then(console.log("connected to database"))