const router = require("express").Router();
const loginController = require("../controller/loginController");

router.get("/", loginController.login_get);

router.post("/", loginController.login_post);

module.exports = router;
