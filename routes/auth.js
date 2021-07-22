const express = require('express');
const router = express.Router();

//get controllers
const authController = require('../controllers/auth');
const validator = require('../validator/index')

//sign up routing
router.route('/signup')
    .post(validator.userSignupVlidator, authController.signup);

//sign in routing
router.route('/signin')
    .post(authController.signin);    

//sign out routing
router.route('/signout')
    .get(authController.signout)    


module.exports = router;    