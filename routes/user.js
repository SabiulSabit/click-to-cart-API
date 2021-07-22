const express = require('express');
const router = express.Router();

//get controllers
const userController = require('../controllers/user');
const authController = require('../controllers/auth');


router.route('/user/:userId')
    .get(authController.requireSignin, authController.isAuth, userController.getReadUser) //get user data
    .put(authController.requireSignin, authController.isAuth, userController.putUpdateUser) // update user data

//get user oder history    
router.get('/orders/by/user/:userId', authController.requireSignin, authController.isAuth, userController.orderHistory)

//url parameter
//get user by id
router.param('userId', userController.userByID)

module.exports = router;    