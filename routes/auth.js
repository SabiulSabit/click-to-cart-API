const express = require('express');
const router = express.Router();

//get controllers
const userController = require('../controllers/auth');
const validator = require('../validator/index')


router.route('/signup')
    .post(validator.userSignupVlidator, userController.signup);

router.route('/signin')
    .post(userController.signin);    

router.route('/signout')
    .get(userController.signout)    


module.exports = router;    