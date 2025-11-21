const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "tbl_users" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    paymentMethod: String,
    address: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tbl_orders", orderSchema);
