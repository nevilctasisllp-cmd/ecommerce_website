const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.placeOrder = async (req, res) => {
  try {
    const { userId, paymentMethod, address } = req.body;

    if (!userId) return res.status(400).json({ message: "userId missing" });

    // Get user's cart (only 1 product cart)
    const cart = await Cart.findOne({ userId }).populate("productId");

    if (!cart) return res.status(400).json({ message: "Cart is empty" });

    // Build order manually (no items array)
    const order = new Order({
      userId,
      items: [
        {
          productId: cart.productId,
          quantity: cart.quantity,
        },
      ],
      paymentMethod,
      address,
      totalAmount: cart.productId.price * cart.quantity,
      status: "Pending",
    });

    await order.save();

    // Clear cart
    await Cart.findOneAndDelete({ userId });

    return res.json({ success: true, order });
  } catch (err) {
    console.log("CHECKOUT ERROR:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
