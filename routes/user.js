const express = require('express');
const router = express.Router();

//get controllers
const userController = require('../controllers/user');
const authController = require('../controllers/auth');


router.get('/secret/:userId',authController.requireSignin, (req,res,next)=>{
    res.json({
        user: req.profile
    })
})
router.param('userId', userController.userByID)

module.exports = router;    