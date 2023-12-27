const signupController = require("../controller/signupController");
const router = require("express").Router();

router.get("/", signupController.signup_get);

router.post("/", signupController.signup_post);

module.exports = router;
