const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

productSchema.index({ productId: 1 }, { unique: true });
productSchema.index({ name: 1, id: 1 }, { unique: true });
const Product = mongoose.model("Products", productSchema);
module.exports = Product;
