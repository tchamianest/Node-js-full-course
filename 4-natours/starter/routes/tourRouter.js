const express = require('express');
const router = express.Router();

const tourController = require('./../controller/tourController');

///refactorie our code

router
  .route('/')
  .get(tourController.getallturs)
  .post(tourController.postnewtour)
  .delete(tourController.deletetour);

//with id
router
  .route('/:id')
  .get(tourController.getonetour)
  .patch(tourController.updatetours)
  .delete(tourController.deletetour);

module.exports = router;
