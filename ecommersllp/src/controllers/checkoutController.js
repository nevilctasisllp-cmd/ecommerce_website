const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.placeOrder = async (req, res) => {
  try {
    const { userId, paymentMethod, address } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId missing" });
    }

    //  Get ALL cart items of this user
    const cartItems = await Cart.find({ userId }).populate("productId");

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ⭐ Build order items array
    const orderItems = cartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    // ⭐ Calculate total
    const totalAmount = cartItems.reduce(
      (acc, it) => acc + it.productId.price * it.quantity,
      0
    );

    // ⭐ Create new order
    const order = new Order({
      userId,
      items: orderItems,
      paymentMethod,
      address,
      totalAmount,
      status: "pending",
    });

    await order.save();

    // ⭐ Clear user's cart
    await Cart.deleteMany({ userId });

    return res.json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.log("CHECKOUT ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
