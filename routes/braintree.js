const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const braintreeController = require('../controllers/braintree'); 

router.get('/braintree/getToken/:userId',authController.requireSignin, authController.isAuth,braintreeController.generateToken  )

router.post('/braintree/payment/:userId',authController.requireSignin, authController.isAuth,braintreeController.postProcessPayment  )


router.param('userId', userController.userByID);

module.exports = router;    