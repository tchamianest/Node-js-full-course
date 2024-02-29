/* eslint-disable prettier/prettier */
const express = require("express");

const router = express.Router();

const tourController = require("../controller/tourController");

// router.param("id", tourController.checkId);

router
  .route("/")
  .get(tourController.getallturs)
  .post(tourController.postnewtour)
  .delete(tourController.deletetour);

router.route("/tour-stats").get(tourController.getTourStats);
router
  .route("/:id")
  .get(tourController.getonetour)
  .patch(tourController.updatetours)
  .delete(tourController.deletetour);

module.exports = router;
