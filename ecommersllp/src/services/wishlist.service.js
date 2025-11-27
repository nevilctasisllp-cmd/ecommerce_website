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
    try {
      let wl = await Wishlist.findOne({ user: userId });

      if (!wl) {
        return {
          status: false,
          message: "Wishlist not found",
          data: null,
        };
      }

      // Check if product exists
      const isExist = wl.items.some(
        (i) => i.productId.toString() === productId.toString()
      );

      if (!isExist) {
        return {
          status: false,
          message: "Product not found in wishlist",
          data: wl.items,
        };
      }

      // Remove item
      wl.items = wl.items.filter(
        (i) => i.productId.toString() !== productId.toString()
      );

      await wl.save();

      return {
        status: true,
        message: "Product removed from wishlist successfully",
        data: wl.items,
      };
    } catch (error) {
      console.error("Wishlist Remove Error:", error);
      return {
        status: false,
        message: "Something went wrong while removing product",
        error: error.message,
      };
    }
  }
}

module.exports = new WishlistService();
