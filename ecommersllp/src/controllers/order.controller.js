const orderService = require("../services/order.service");

// Get User Orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await orderService.getUserOrders(userId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

// Get Order Count
exports.getOrderCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await orderService.getOrderCount(userId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
};

// UPDATE ADDRESS
exports.updateAddress = async (req, res) => {
  try {
    const { orderId, newAddress } = req.body;

    if (!orderId || !newAddress)
      return res.status(400).json({ message: "Missing required fields" });

    const updatedOrder = await orderService.updateAddressService(
      orderId,
      newAddress
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    return res.json({
      success: true,
      message: "Address updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    console.error("UPDATE ADDRESS ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId)
      return res.status(400).json({ message: "Order ID is required" });

    const deletedOrder = await orderService.deleteOrderService(orderId);

    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    return res.json({
      success: true,
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (err) {
    console.error("DELETE ORDER ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};
