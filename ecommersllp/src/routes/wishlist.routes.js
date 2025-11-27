// wishlist.routes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const wishlistController = require("../controllers/wishlistcontroller");

// GET wishlist
router.get("/get/:userId", wishlistController.getWishlist);

// ADD to wishlist
router.post("/add/:id", wishlistController.addToWishlist);

// REMOVE from wishlist
router.post("/remove", wishlistController.removeFromWishlist);

module.exports = router;
