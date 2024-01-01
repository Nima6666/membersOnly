const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/user");
const bcrypt = require("bcryptjs");

const verifyCallbackFunction = async (username, password, done) => {
    try {
        const user = await User.findOne({ userName: username });
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

const Strategy = new localStrategy(verifyCallbackFunction);

passport.use(Strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
