module.exports.index_get = function (req, res) {
    res.render("index", { title: "membersOnly" });
};

module.exports.appLoginSuccessful = (req, res) => {
    res.render("dashboard", { user: req.user.userName });
};

module.exports.appLoginFailed = (req, res) => {
    res.send({ msg: "incorrect Username or password" });
};

module.exports.appLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.send({ error: err });
        }
        res.redirect("/");
    });
};
