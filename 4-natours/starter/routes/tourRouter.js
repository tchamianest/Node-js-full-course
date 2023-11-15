const express = require('express');
const router = express.Router();

const tourController = require('./../controller/tourController');

// add param middle ware for the specific id

//middle ware for checking the id before continue
router.param('id', tourController.checkId);
///refactorie our code

router
  .route('/')
  .get(tourController.getallturs)
  .post(tourController.checkbody, tourController.postnewtour)
  .delete(tourController.deletetour);

//with id
router
  .route('/:id')
  .get(tourController.getonetour)
  .patch(tourController.updatetours)
  .delete(tourController.deletetour);

module.exports = router;
