const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
// const User = require("../model/user");
const bcrypt = require("bcryptjs");
const queries = require("../db/query");

const verifyCallbackFunction = async (username, password, done) => {
  try {
    const user = await queries.checkUsername(username);
    const userInfo = user.rows;
    if (userInfo.length < 1) {
      return done(null, false, { message: "Incorrect username" });
    }
    const match = await bcrypt.compare(password, userInfo[0].password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, userInfo[0]);
  } catch (err) {
    console.log(err);
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
    const user = await queries.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
