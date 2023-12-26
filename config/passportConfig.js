const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const verifyCallback = (username, password, done) => {};

const Strategy = new LocalStrategy();

passport.use(Strategy);
