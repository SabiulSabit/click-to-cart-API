const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const 

router.get('/braintree/getToken/:userId',authController.requireSignin, authController.isAuth,  )


router.param('userId', userController.userByID);

module.exports = router;    