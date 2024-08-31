const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  user: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("message", messageSchema);
