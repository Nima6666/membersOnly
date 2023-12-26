const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

const verifyCallback = (username, password, done) => {
    User.find({
        userName: username,
    }).then((user) => {
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    });
};

const Strategy = new LocalStrategy(verifyCallback);

passport.use(Strategy);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (err, user) {
        done(err, user);
    });
});
