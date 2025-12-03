const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { updateAddress } = require("../controllers/order.controller");

router.get("/count/:userId", orderController.getOrderCount);
router.get("/:userId", orderController.getUserOrders);
router.put("/update-address", updateAddress);
router.delete("/delete/:orderId", orderController.deleteOrder);

module.exports = router;
