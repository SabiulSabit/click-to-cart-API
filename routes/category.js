const express = require("express");
const router = express.Router();

//get controllers
const categoryController = require("../controllers/category");
const authController = require("../controllers/auth");
const userController = require("../controllers/user");

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
  .put(
    authController.requireSignin,
    authController.isAuth,
    authController.isAdmin,
    categoryController.update
  );

router
  .route("/category/:categoryId/:userId")
  .delete(
    authController.requireSignin,
    authController.isAuth,
    authController.isAdmin,
    categoryController.delete 
  );  

router.route("/category/:categoryId").get(categoryController.read);
router.route("/categories").get(categoryController.readall);

router.param("categoryId", categoryController.categoryByID);
router.param("userId", userController.userByID);

module.exports = router;
