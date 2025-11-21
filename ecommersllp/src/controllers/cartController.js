const Cart = require("../models/cart.model");

// ADD ITEM TO CART
exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    let item = await Cart.findOne({ userId, productId });

    if (item) {
      item.quantity += quantity || 1;
      await item.save();
      return res.json({ success: true, message: "Quantity updated", item });
    }

    const newItem = await Cart.create({
      userId,
      productId,
      quantity: quantity || 1,
    });

    res.json({ success: true, message: "Added to cart", item: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER CART
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await Cart.find({ userId }).populate("productId");

    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REMOVE ITEM
exports.removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await Cart.findOneAndDelete({ userId, productId });

    res.json({ success: true, message: "Product removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE QTY
exports.updateQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const item = await Cart.findOne({ userId, productId });

    if (!item) return res.json({ success: false, message: "Item not found" });

    item.quantity = quantity;
    await item.save();

    res.json({ success: true, message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CLEAR FULL CART
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    await Cart.deleteMany({ userId });

    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
