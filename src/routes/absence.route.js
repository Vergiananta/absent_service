const AbsenceService = require("../services/absence");
const express = require("express");
const router = express.Router();
const absenceService = new AbsenceService();
const absenceController = require("../controller/absent.controller");

router.get("/list/:id", (req, res, next) => {
  absenceController.listAbsenceByEmployee(req, res, absenceService);
});

module.exports = router;
