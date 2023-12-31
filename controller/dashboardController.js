const Message = require("../model/message");

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
