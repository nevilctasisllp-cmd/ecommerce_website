const { default: mongoose } = require("mongoose");
const Order = require("../models/order.model");

exports.getUserOrders = async (userId) => {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  return { status: true, data: orders };
};
/**
 *
 * @param {string} userId
 * @returns
 */
exports.getOrderCount = async (userId) => {
  const count = await Order.countDocuments({
    userId: new mongoose.Types.ObjectId(userId),
  });
  return { status: true, count };
};

exports.updateAddressService = async (orderId, newAddress) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { address: newAddress },
    { new: true }
  );
};
