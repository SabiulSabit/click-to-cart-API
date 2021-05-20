const express = require('express');
const router = express.Router();

//get controllers
const productController = require('../controllers/product');
const userController = require('../controllers/user');
const authController = require('../controllers/auth');


router.route('/product/create/:userId')
    .post(authController.requireSignin, authController.isAuth, authController.isAdmin,productController.create);

router.route('/product/:productId')
    .get(productController.read)

router.route('/product/:productId/:userId')
    .delete(authController.requireSignin, authController.isAuth, authController.isAdmin,productController.remove)


router.param('userId', userController.userByID)    
router.param('productId', productController.productByID)    

module.exports = router;    