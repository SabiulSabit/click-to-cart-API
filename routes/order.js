const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const orderController = require('../controllers/order'); 
const productController = require('../controllers/product'); 

router.post('/order/create/:userId', authController.requireSignin, authController.isAuth, userController.addOrderToHistory,productController.decreaseQnt, orderController.postCreatOrder)
router.get('/order/list/:userId',authController.requireSignin, authController.isAuth, authController.isAdmin, orderController.listOrder )

router.param('userId', userController.userByID);

module.exports = router;    