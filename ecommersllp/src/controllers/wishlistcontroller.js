const Wishlist = require("../models/wishlist.model");

// ADD TO WISHLIST
exports.addWishlist = async (req, res) => {
  try {
    const { userId, productId, name, price, image } = req.body;

    const exist = await Wishlist.findOne({ userId, productId });
    if (exist) return res.json({ message: "Already in wishlist" });

    const item = await Wishlist.create({
      userId,
      productId,
      name,
      price,
      image,
    });

    res.json({ message: "Added to wishlist", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET WISHLIST
exports.getWishlist = async (req, res) => {
  const { userId } = req.params;
  const items = await Wishlist.find({ userId });
  res.json(items);
};

// REMOVE WISHLIST ITEM
exports.removeWishlist = async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed" });
};
