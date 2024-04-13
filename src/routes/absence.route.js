const AbsenceService = require("../services/absence");
const express = require("express");
const router = express.Router();
const absenceService = new AbsenceService();
const absenceController = require("../controller/absent.controller");
const tokenValidation = require("../middleware/token.validation");

router.get(
  "/list/:id",
  (req, res, next) => tokenValidation(req, res, next, "ADMIN"),
  (req, res, next) => {
    absenceController.listAbsenceByEmployee(req, res, absenceService);
  }
);

router.get(
  "/",
  (req, res, next) => tokenValidation(req, res, next, "STAFF"),
  (req, res, next) => {
    absenceController.findAbsenceToday(req, res, absenceService);
  }
);

module.exports = router;
