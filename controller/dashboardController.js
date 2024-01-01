const Message = require("../model/message");
const User = require("../model/user");

module.exports.membershipReq = async (req, res) => {
    if (!req.user) return res.send({ msg: "session timed out" });
    try {
        const user = User.findOne({ _id: req.user.id });
        if (req.body.beMember === process.env.MEMBERSHIPKEY) {
            user.updateOne({ membershipStat: true });

            res.redirect("/dashboard");
        } else {
            res.send({ msg: "membership key didnt match" });
        }
    } catch (err) {
        res.send({ msg: err });
    }
};

module.exports.message_post = async (req, res) => {
    if (!req.user) return res.send({ msg: "session timed out" });
    try {
        const message = new Message({
            title: req.body.title,
            message: req.body.message,
            user: req.user.userName,
        });
        await message
            .save()
            .then(console.log("message added"))
            .finally(() => {
                res.redirect("/dashboard");
            });
    } catch (err) {
        res.send({ msg: err });
    }
};
