const router = require("express").Router();
const user = require("../models/user");
const User = require("../models/user");

router.get("/", (req, res, next) => {
    res.render("signup");
});

router.post("/", async (req, res, next) => {
    let errMessage = "";
    let alreadyRegistered = false;
    if (user.body.password !== user.body.confirmPswd) {
        const message = "password didnt match";
        res.send({ mes: message });
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
            res.send({ err: errMessage });
        }
    } catch {
        (err) => {
            throw new Error(err);
        };
    }
    res.redirect("/");
});

module.exports = router;
