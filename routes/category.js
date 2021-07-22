const express = require("express");
const router = express.Router();

//get controllers
const categoryController = require("../controllers/category");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");

//create a new category
router
  .route("/category/create/:userId")
  .post(
    authController.requireSignin,
    authController.isAuth,
    authController.isAdmin,
    categoryController.create
  );

router
  .route("/category/:categoryId/:userId")
  .put(             //update a category  
    authController.requireSignin,
    authController.isAuth,
    authController.isAdmin,
    categoryController.update
  )
  .delete(         //delete a category  
    authController.requireSignin,
    authController.isAuth,
    authController.isAdmin,
    categoryController.delete 
  );  

//get single category data  
router.route("/category/:categoryId").get(categoryController.read);

//get all category data
router.route("/categories").get(categoryController.readall);

//url parameter
//get category by id
router.param("categoryId", categoryController.categoryByID);
//get user by id
router.param("userId", userController.userByID);

module.exports = router;
