module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({ msg: "user not Authorised" });
  }
};

module.exports.isMember = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  console.log(`${req.user.username} is a member`);
  if (req.user.membershipstat) {
    next();
  } else {
    res.send({ msg: "bad request" });
  }
};
