const mongoose = require("mongoose");
const router = require("express").Router();

router.get("/", function (req, res) {
    res.render("login");
});