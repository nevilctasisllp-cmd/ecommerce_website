const express = require("express");
const router = express.Router();
const cart = require("../controllers/cartController");

router.post("/add/:userId", cart.addToCart);

router.get("/:userId", cart.getCart);

router.post("/remove", cart.removeItem);

router.post("/update", cart.updateQty);

router.post("/clear", cart.clearCart);

module.exports = router;
