const passport = require("passport");

module.exports.login_get = function (req, res) {
    res.render("login");
};

module.exports.login_post = passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login-failed",
});
