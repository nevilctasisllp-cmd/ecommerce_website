const wishlistService = require("../services/wishlist.service");
const Wishlist = require("../models/wishlist.model");
const { default: mongoose } = require("mongoose");

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId: ", userId);

    const data = await Wishlist.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
    ]);

    res.json(data);
    console.log("data: ", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting wishlist" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId, name, price } = req.body;
    const data = await wishlistService.addToWishlist(
      req.params.id,
      productId,
      name,
      price
    );

    res.json({ message: "Added", wishlist: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const data = await wishlistService.removeFromWishlist(
      req.user.id,
      productId
    );

    res.json({ message: "Removed", wishlist: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
