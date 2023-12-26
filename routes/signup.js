const router = require("express").Router();
const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.get("/", (req, res, next) => {
    res.render("signup");
});

router.post("/", async (req, res, next) => {
    let errMessage = "";
    let alreadyRegistered = false;
    if (req.body.password !== req.body.confirmPswd) {
        const message = "password didnt match";
        return res.send({ mes: message });
    }
    try {
        User.find({ userName: req.body.username }).then((user) => {
            if (user.length > 1) {
                errMessage = "username already in use";
                alreadyRegistered = true;
            }
        });
        User.find({ email: req.body.email }).then((user) => {
            if (user.length > 1) {
                errMessage = "email already in use";
                alreadyRegistered = true;
            }
        });
        if (alreadyRegistered) {
            return res.send({ err: errMessage });
        }
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            // Store hash in your password DB.
            const user = new User({
                fullName: `${req.body.firstname} ${req.body.lastname}`,
                userName: req.body.username,
                email: req.body.email,
                password: hash,
            });
            user.save();
        });
    } catch {
        (err) => {
            throw new Error(err);
        };
    }
    res.redirect("/");
});

module.exports = router;
