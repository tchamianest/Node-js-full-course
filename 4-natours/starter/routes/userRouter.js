const express = require('express');

const userController = require('./../controller/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getalluser)
  .post(userController.createuser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateuser)
  .delete(userController.deleteuser);

module.exports = router;
