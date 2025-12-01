const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "tbl_users" },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
        price: Number,
        name: String,
      },
    ],
    totalAmount: Number,
    paymentMethod: String,
    address: String,
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "out-for-delivery", "delivered", "cancelled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tbl_orders", orderSchema);
