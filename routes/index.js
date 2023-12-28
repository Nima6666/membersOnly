var express = require("express");
var router = express.Router();
const authHandler = require("../config/auth");
const indexController = require("../controller/indexController");

/* GET home page. */
router.get("/", indexController.index_get);

router.get("/success", authHandler.isAuth, indexController.appLoginSuccessful);

router.get("/login-failed", indexController.appLoginFailed);

router.get("/logout", indexController.appLogout);

module.exports = router;
