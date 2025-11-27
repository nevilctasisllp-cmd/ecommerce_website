// src/services/product.service.js

const Product = require("../models/product.model");

exports.createProduct = async (data) => {
  if (!data.productId) data.productId = Date.now().toString();
  const product = new Product(data);
  return await product.save();
};

exports.getAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

exports.adjustStock = async (id, amount) => {
  if (typeof amount !== "number") throw new Error("amount must be number");

  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  product.stock = Math.max(0, product.stock + amount);
  return await product.save();
};
