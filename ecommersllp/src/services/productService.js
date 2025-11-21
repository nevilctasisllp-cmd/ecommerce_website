const Product = require("../models/product.model");

exports.createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

exports.getAllProducts = async () => {
  return await Product.find();
};

exports.getProductById = async (id) => {
  return await Product.findById(id);
};

exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
