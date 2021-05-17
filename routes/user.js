const express = require('express');
const router = express.Router();

//get controllers
const userController = require('../controllers/user');

router.route('/signup')
    .post(userController.signup);

module.exports = router;    