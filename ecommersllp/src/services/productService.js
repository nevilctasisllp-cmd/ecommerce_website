// src/services/product.service.js

const { default: mongoose } = require("mongoose");
const Product = require("../models/product.model");

exports.createProduct = async (data) => {
  if (!data.productId) data.productId = Date.now().toString();
  const product = new Product(data);
  return await product.save();
};

exports.getAllProducts = async () => {
  const products = await Product.aggregate([
    {
      $lookup: {
        from: "tbl_wishlists",
        let: { productId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$productId", "$$productId"] },
                  // { $eq: ["$userId", mongoose.Types.ObjectId(userId)] },
                ],
              },
            },
          },
        ],
        as: "wishlistInfo",
      },
    },
    {
      $addFields: {
        isWishlist: { $gt: [{ $size: "$wishlistInfo" }, 0] },
      },
    },
  ]);
  return products;
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
