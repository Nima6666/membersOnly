const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likesSchema = new Schema({
    user: { type: String },
});
const commentSchema = new Schema({
    user: { type: String },
    comment: { type: Object },
});

const messageSchema = new Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    user: { type: String, required: true },
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("message", messageSchema);
