const express = require('express');
const router = express.Router();

//get controllers
const userController = require('../controllers/user');



router.param('userId', userController.userByID)



module.exports = router;    