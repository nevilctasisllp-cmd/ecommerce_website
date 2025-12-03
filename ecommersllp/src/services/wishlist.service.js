const Wishlist = require("../models/wishlist.model");

class WishlistService {
  async getWishlist(userId) {
    let wl = await Wishlist.findOne({ userId: userId });
    return wl || { items: [] };
  }

  async addToWishlist(userId, productId, name, price) {
    if (!productId) throw new Error("productId required");

    let wl = await Wishlist.findOne({ userId: userId, productId: productId });
    if (!wl) wl;

    const newItem = await Wishlist.create({
      productId,
      name,
      price,
      userId,
    });

    return wl;
  }

  async removeFromWishlist(userId, productId) {
    if (!userId || !productId) throw new Error("userId or productId missing");

    const deleted = await Wishlist.deleteOne({ userId, productId });
    return deleted;
  }
}

module.exports = new WishlistService();
