const mongoose = require("mongoose");
const Order = require("../models/order.model");

// GET ORDERS
exports.getUserOrders = async (userId) => {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  return { status: true, data: orders };
};

// GET ORDER COUNT
exports.getOrderCount = async (userId) => {
  const count = await Order.countDocuments({
    userId: new mongoose.Types.ObjectId(userId),
  });
  return { status: true, count };
};

// UPDATE ADDRESS SERVICE
exports.updateAddressService = async (orderId, newAddress) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { address: newAddress },
    { new: true }
  );
};

// DELETE ORDER SERVICE
exports.deleteOrderService = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};
