const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const orderController = require('../controllers/order'); 

router.post('/order/create/:userId', authController.requireSignin, authController.isAuth, orderController.postCreatOrder)

router.param('userId', userController.userByID);

module.exports = router;    