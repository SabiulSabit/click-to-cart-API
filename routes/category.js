const express = require('express');
const router = express.Router();

//get controllers
const categoryController = require('../controllers/category');


router.route('/category')
    .post(categoryController.create);


module.exports = router;    