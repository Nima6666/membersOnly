const User = require("../model/user");
const bcrypt = require("bcryptjs");

module.exports.signup_get = function (req, res) {
    res.render("signup");
};

module.exports.signup_post = async function (req, res) {
    console.log(req.body);
    if (req.body.password !== req.body.confirmPassword) {
        return res.send({ msg: "password doesnt match" });
    }
    console.log("checking Email");
    User.find({ email: req.body.email }).then((users) => {
        console.log("found Users", users);
        if (users.length > 0) {
            return res.send({ msg: "email already registered" });
        } else {
            User.find({ userName: req.body.username }).then((users) => {
                if (users.length > 0) {
                    return res.send({ msg: "username not avilable" });
                }
            });
        }
    });
    await bcrypt.hash(req.body.password, 10).then(async (hashedPassword) => {
        const fullname = `${req.body.firstname} ${req.body.lastname}`;
        const user = new User({
            fullName: fullname,
            userName: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        });
        await user
            .save()
            .then(console.log("signedup successfully"))
            .finally(res.redirect("/"));
    });
};
