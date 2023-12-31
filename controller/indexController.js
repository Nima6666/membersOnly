const Message = require("../model/message");

module.exports.index_get = async function (req, res) {
    try {
        const allMessages = await Message.find();
        res.render("index", {
            title: "membersOnly",
            message: allMessages,
        });
    } catch (err) {
        res.send({ msg: err });
    }
};

module.exports.appLoginSuccessful = async (req, res) => {
    try {
        const allMessages = await Message.find();
        res.render("dashboard", {
            user: req.user.userName,
            message: allMessages,
        });
    } catch (err) {
        res.send({ msg: err });
    }
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
