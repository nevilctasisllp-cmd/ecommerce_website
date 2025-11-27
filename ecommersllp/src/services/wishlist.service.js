const Wishlist = require("../models/wishlist.model");

class WishlistService {
  async getWishlist(userId) {
    let wl = await Wishlist.findOne({ userId: userId });
    return wl || { items: [] };
  }

  async addToWishlist(userId, productId, name, price) {
    if (!productId) throw new Error("productId required");

    let wl = await Wishlist.findOne({ userId: userId, productId });
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
    let wl = await Wishlist.findOne({ user: userId });
    if (!wl) return { items: [] };

    wl.items = wl.items.filter((i) => i.productId !== productId);
    await wl.save();

    return wl;
  }
}

module.exports = new WishlistService();
