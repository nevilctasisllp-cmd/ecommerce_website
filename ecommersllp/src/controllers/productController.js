const productService = require("../services/productService");
const Product = require("../models/product.model");

exports.addProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({
      message: "Duplicate product! Product ID or Name already exists.",
      error,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    res.json({ message: "Product updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating", err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Error deleting", err });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const body = req.body;
    if (!body.productId) body.productId = Date.now().toString();
    const p = new Product(body);
    await p.save();
    return res.status(201).json({ success: true, product: p });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate product (productId or name exists)",
        key: err.keyValue,
      });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get all
exports.getAllProducts = async (req, res) => {
  try {
    const list = await Product.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update by _id
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json({ success: true, product: updated });
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(400)
        .json({ message: "Duplicate field", key: err.keyValue });
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Adjust stock: body { amount: number }
exports.adjustStock = async (req, res) => {
  try {
    const { amount } = req.body;
    if (typeof amount !== "number")
      return res.status(400).json({ message: "amount must be number" });
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: "Product not found" });
    prod.stock = Math.max(0, prod.stock + amount);
    await prod.save();
    res.json({ success: true, product: prod });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
