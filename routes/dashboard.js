const router = require("express").Router();
const dashboardController = require("../controller/dashboardController");

router.post("/message-post", dashboardController.message_post);

module.exports = router;
