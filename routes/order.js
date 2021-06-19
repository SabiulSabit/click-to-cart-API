const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const orderController = require('../controllers/order'); 



router.param('userId', userController.userByID);

module.exports = router;    