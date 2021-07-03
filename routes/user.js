const express = require('express');
const router = express.Router();

//get controllers
const userController = require('../controllers/user');
const authController = require('../controllers/auth');


router.get('/secret/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, (req, res, next) => {
    res.json({
        user: req.profile
    })
})

router.route('/user/:userId')
    .get(authController.requireSignin, authController.isAuth, userController.getReadUser)
    .put(authController.requireSignin, authController.isAuth, userController.putUpdateUser)

router.get('/orders/by/user/:userId', authController.requireSignin, authController.isAuth, userController.orderHistory)


router.param('userId', userController.userByID)

module.exports = router;