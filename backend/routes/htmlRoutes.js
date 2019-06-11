const express = require("express");
const router = express.Router();

router.route("/").get(getController.indexPage); 

module.exports = router;