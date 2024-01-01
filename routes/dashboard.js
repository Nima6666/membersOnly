const router = require("express").Router();
const dashboardController = require("../controller/dashboardController");
const auth = require("../config/auth");

router.post("/message-post", auth.isMember, dashboardController.message_post);

router.post("/membership", dashboardController.membershipReq);

module.exports = router;
