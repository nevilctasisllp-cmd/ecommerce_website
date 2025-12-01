const wishlistService = require("../services/wishlist.service");
const Wishlist = require("../models/wishlist.model");
const { default: mongoose } = require("mongoose");

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = await Wishlist.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
    ]);

    res.json(data);
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
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        status: false,
        message: "userId or productId missing",
      });
    }

    const deletedItem = await Wishlist.deleteOne({
      _id: productId._id,
    });

    console.log("deletedItem: ", deletedItem);
    if (deletedItem.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "Product not found in wishlist",
      });
    }

    const updatedWishlist = await Wishlist.find({ userId });

    return res.json({
      status: true,
      message: "Product removed from wishlist",
      data: updatedWishlist,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
