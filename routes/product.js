const express = require('express');
const router = express.Router();

//get controllers
const productController = require('../controllers/product');
const userController = require('../controllers/user');
const authController = require('../controllers/auth');


router.route('/product/create/:userId')
    .post(authController.requireSignin, authController.isAuth, authController.isAdmin,productController.create);

router.param('userId', userController.userByID)    

module.exports = router;    