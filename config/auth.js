module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send({ msg: "user not Authorised" });
    }
};

module.exports.isMember = (req, res, next) => {
    console.log(`${req.user.userName} is a member`);
    if (req.user.membershipStat) {
        next();
    } else {
        res.send({ msg: "bad request" });
    }
};
