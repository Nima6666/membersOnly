const bcrypt = require("bcryptjs");
const queries = require("../db/query");

module.exports.signup_get = function (req, res) {
  res.render("signup");
};

module.exports.validatePassword = async (req, res, next) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  // Validate password on the server side
  const errors = [];
  // Checking Email

  const emailExists = await queries.checkEmail(req.body.email);

  if (emailExists) {
    return res.json({
      message: "Error: email already exists.",
    });
  }

  const usernameExists = await queries.checkUsername(req.body.username);

  if (usernameExists.rowCount > 0) {
    return res.json({
      message: "Error: Username not avilable",
    });
  }
  // At least 8 characters
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }
  // Contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  // Contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  // Contains at least one digit
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one digit.");
  }
  // Confirm password matches
  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }
  // Send the validation result to the client
  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ errors });
  }
};

module.exports.signup_post = async function (req, res) {
  try {
    await bcrypt.hash(req.body.password, 10).then(async (hashedPassword) => {
      const fullname = `${req.body.firstname} ${req.body.lastname}`;
      const registered = await queries.register(
        fullname,
        req.body.email,
        req.body.username,
        hashedPassword
      );

      if (registered) {
        console.log("signedup successfully");
        res.redirect("/");
      } else {
        res.send("smthing went wrong");
      }

      //   await user
      //     .save()
      //     .then(console.log("signedup successfully"))
      //     .finally(res.redirect("/"));
    });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};
