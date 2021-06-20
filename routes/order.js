const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const orderController = require("../controllers/order");
const productController = require("../controllers/product");

router.post(
  "/order/create/:userId",
  authController.requireSignin,
  authController.isAuth,
  userController.addOrderToHistory,
  productController.decreaseQnt,
  orderController.postCreatOrder
);
router.get(
  "/order/list/:userId",
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  orderController.listOrder
);
router.get(
  "/order/status-values/:userId",
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  orderController.getStatusValues
);
router.put(
  "/order/:orderId/status/:userId",
  authController.requireSignin,
  authController.isAuth,
  authController.isAdmin,
  orderController.updateOrderStatus
);

router.param("userId", userController.userByID);
router.param("orderId", orderController.orderByID);

module.exports = router;
