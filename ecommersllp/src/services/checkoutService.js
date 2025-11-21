const Cart = require("../models/cart.model");
const Order = require("../models/order.model");

class CheckoutService {
  async placeOrder(userId, paymentMethod, address) {
    console.log("userId: ", userId);
    if (!userId || !paymentMethod || !address)
      throw new Error("Missing parameters");

    const cart = await Cart.find({ userId });
    console.log("userId: ", userId);
    if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

    const order = new Order({
      userId,
      items: cart.items,
      paymentMethod,
      address,
      totalAmount: cart.items.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
      ),
      status: "Pending",
    });

    await order.save();
    await Cart.findOneAndDelete({ userId });

    return order;
  }

  async getOrders(userId) {
    if (!userId) throw new Error("userId missing");
    return Order.find({ userId }).populate("items.productId");
  }
}
Cart.findOne({ userId }).populate("items.productId");

module.exports = new CheckoutService();
