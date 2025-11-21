const express = require("express");
const router = express.Router();
const checkout = require("../controllers/checkoutController");

router.post("/place-order", checkout.placeOrder);

module.exports = router;
