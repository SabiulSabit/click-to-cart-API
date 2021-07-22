const express = require('express');
const router = express.Router();

//get controllers
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const braintreeController = require('../controllers/braintree'); 

//generate token for braintree
router.get('/braintree/getToken/:userId',authController.requireSignin, authController.isAuth,braintreeController.generateToken  )

//process a payment
router.post('/braintree/payment/:userId',authController.requireSignin, authController.isAuth,braintreeController.postProcessPayment  )

//get user by id
router.param('userId', userController.userByID);

module.exports = router;    