const express = require("express");
const router = express.Router();

const orderController = require("./adminOrder.controller");
const { authenticate, isAdmin } = require("../middleware/authenticate");

// Apply authentication and admin check to all routes
router.use(authenticate, isAdmin);

// Admin Order Management Routes
router.get("/", orderController.getAllOrders);
router.put("/:orderId/confirmed", orderController.confirmedOrder);
router.put("/:orderId/ship", orderController.shippedOrder);
router.put("/:orderId/deliver", orderController.deliveredOrder);
router.put("/:orderId/cancel", orderController.cancelOrder);
router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;