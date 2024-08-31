// const Message = require("../model/message");
const queries = require("../db/query");

module.exports.index_get = async function (req, res) {
  try {
    const allMessages = await queries.getMessages();
    console.log(allMessages);
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
    console.log("Logged in user: ", req.user);
    const allMessages = await queries.getMessageWithUser();

    res.render("dashboard", {
      user: req.user.username,
      message: allMessages,
      member: req.user.membershipstat,
    });
  } catch (err) {
    console.log(err);
    res.send({ msg: err });
  }
};

module.exports.appLoginFailed = (req, res) => {
  res.send({ msg: "incorrect Username or password" });
  // setTimeout(() => {
  //   res.redirect("/");
  // }, 5000);
};

module.exports.appLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.send({ error: err });
    }
    res.redirect("/");
  });
};
