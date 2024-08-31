const queries = require("../db/query");

module.exports.membershipReq = async (req, res) => {
  if (!req.user) return res.send({ msg: "session timed out" });
  try {
    const user = queries.findUserById(req.user.id);
    if (req.body.beMember === process.env.MEMBERSHIPKEY) {
      await queries.giveMemberShip(req.user.id);
      res.redirect("/dashboard");
    } else {
      res.send({ msg: "membership key didnt match" });
    }
  } catch (err) {
    res.send({ msg: err });
    // setTimeout(() => {
    //   res.redirect("/");
    // }, 5000);
  }
};

module.exports.message_post = async (req, res) => {
  console.log("adding message");
  if (!req.user) return res.send({ msg: "session timed out" });
  try {
    const messageAdded = await queries.addMessage(
      req.body.title,
      req.body.message,
      req.user.id
    );
    if (messageAdded) {
      res.redirect("/dashboard");
    } else {
      res.send("Error adding message");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: err });
    // setTimeout(() => {
    //   res.redirect("/");
    // }, 5000);
  }
};
