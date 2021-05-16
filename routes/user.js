const express = require('express');
const router = express.Router();

//get controllers
const userController = require('../controllers/user');

router.route('/')
    .get(userController.sayhi);

module.exports = router;    