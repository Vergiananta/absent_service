const express = require("express");
const router = express.Router();
const absenceRoute = require("./absence.route");

router.use("/absence", absenceRoute);

module.exports = router;
