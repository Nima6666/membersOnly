const router = require("express").Router();
const loginController = require("../controller/loginController");

router.get("/", loginController.login_get);

module.exports = router;
