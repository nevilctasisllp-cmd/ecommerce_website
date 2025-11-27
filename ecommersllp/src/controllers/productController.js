const productService = require("../services/productService");

exports.addProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({
        success: false,
        message: "Duplicate product (productId or name exists)",
        key: err.keyValue,
      });

    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const list = await productService.getAllProducts();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
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

exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.adjustStock = async (req, res) => {
  try {
    const product = await productService.adjustStock(
      req.params.id,
      req.body.amount
    );
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
