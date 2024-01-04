const Message = require("../model/message");

module.exports.index_get = async function (req, res) {
    try {
        const allMessages = await Message.find({}).sort({ time: -1 });
        res.render("index", {
            title: "membersOnly",
            message: allMessages,
        });
    } catch (err) {
        res.send({ msg: err });
        setTimeout(() => {
            res.redirect("/");
        }, 5000);
    }
};

module.exports.appLoginSuccessful = async (req, res) => {
    try {
        const allMessages = await Message.find({}).sort({ time: -1 });
        res.render("dashboard", {
            user: req.user.userName,
            message: allMessages,
            member: req.user.membershipStat,
        });
    } catch (err) {
        res.send({ msg: err });
        setTimeout(() => {
            res.redirect("/");
        }, 5000);
    }
};

module.exports.appLoginFailed = (req, res) => {
    res.send({ msg: "incorrect Username or password" });
    setTimeout(() => {
        res.redirect("/");
    }, 5000);
};

module.exports.appLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.send({ error: err });
        }
        res.redirect("/");
    });
};
