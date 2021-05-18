const express = require('express');
const router = express.Router();

//get controllers
const authController = require('../controllers/auth');
const validator = require('../validator/index')


router.route('/signup')
    .post(validator.userSignupVlidator, authController.signup);

router.route('/signin')
    .post(authController.signin);    

router.route('/signout')
    .get(authController.signout)    


module.exports = router;    