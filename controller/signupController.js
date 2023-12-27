const User = require("../model/user");
const bcrypt = require("bcryptjs");

module.exports.signup_get = function (req, res) {
    res.render("signup");
};

module.exports.signup_post = function (req, res) {
    bcrypt.hash(req.body.password, 10).then(async (hashedPassword) => {
        console.log(hashedPassword);
        const user = new User({
            userName: req.body.username,
            password: hashedPassword,
        });
        await user
            .save()
            .then(console.log("signedup successfully"))
            .finally(res.redirect("/"));
    });
};
