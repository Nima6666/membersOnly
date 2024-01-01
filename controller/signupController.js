const User = require("../model/user");
const bcrypt = require("bcryptjs");

module.exports.signup_get = function (req, res) {
    res.render("signup");
};

module.exports.validatePassword = async (req, res, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    // Validate password on the server side
    const errors = [];

    // Checking Email
    await User.find({ email: req.body.email }).then((users) => {
        console.log("found Users", users);
        if (users.length > 0) {
            errors.push("email already registered");
        }
    });
    // Checking Username
    await User.find({ userName: req.body.username }).then((users) => {
        if (users.length > 0) {
            errors.push("username not avilable");
        }
    });

    // At least 8 characters
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters.");
    }

    // Contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }

    // Contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter.");
    }

    // Contains at least one digit
    if (!/\d/.test(password)) {
        errors.push("Password must contain at least one digit.");
    }

    // Confirm password matches
    if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
    }

    // Send the validation result to the client
    if (errors.length === 0) {
        next();
    } else {
        res.status(400).json({ errors });
    }
};

module.exports.signup_post = async function (req, res) {
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
