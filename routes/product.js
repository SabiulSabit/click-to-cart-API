const express = require("express");
const router = express.Router();

//get controllers
const productController = require("../controllers/product");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");

//create a new product
router
  .route("/product/create/:userId")
  .post(
    authController.requireSignin,
    authController.isAuth,
    authController.isAdmin,
    productController.create
  );

//get single prodcut  
router.route("/product/:productId").get(productController.read);

//delete a product
router
  .route("/product/:productId/:userId")
  .delete(
    authController.requireSignin,
    authController.isAuth,
    authController.isAdmin,
    productController.remove
  );

//update a prodcut  
router
  .route("/product/:productId/:userId")
  .put(
    authController.requireSignin,
    authController.isAuth,
    authController.isAdmin,
    productController.update
  );

//get all products  
router.route("/products").get(productController.getAll);

//get related prodcuts
router.route("/products/related/:productId").get(productController.listRelated);

//get products by category
router.route("/products/categories").get(productController.allCategory);

//get products by search
router.route("/products/by/search").post(productController.searchData);
router.route("/products/search").get(productController.querySearchData);

//get product photo
router.route("/product/photo/:productId")
  .get(productController.getPhoto)

  
//url parameter
//get user by id
router.param("userId", userController.userByID);
//get product by id
router.param("productId", productController.productByID);

module.exports = router;
