const express = require("express");
const router = express.Router();


//get controllers
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const orderController = require("../controllers/order");
const productController = require("../controllers/product");

//create a new order
router.route("/order/create/:userId").post(
  authController.requireSignin,
  authController.isAuth,
  userController.addOrderToHistory,
  productController.decreaseQnt,
  orderController.postCreatOrder
);

//get all order list for a user
router.route("/order/list/:userId")
.get(
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  orderController.listOrder
);


//get user oder status
router.route( "/order/status-values/:userId")
.get(
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  orderController.getStatusValues
);

//update user order status
router.route("/order/:orderId/status/:userId")
.put(
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  orderController.updateOrderStatus
);

//url parameter
//get user by id
router.param("userId", userController.userByID);
//get order by id
router.param("orderId", orderController.orderByID);

module.exports = router;
