const productService = require("../services/productService");
const Wishlist = require("../models/wishlist.model");
const Product = require("../models/product.model");

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

// exports.getProductsWithWishlist = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const products = await Product.aggregate([
//       {
//         $lookup: {
//           from: "tbl_wishlists",
//           let: { productId: "$_id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     { $eq: ["$productId", "$$productId"] },
//                     { $eq: ["$userId", mongoose.Types.ObjectId(userId)] },
//                   ],
//                 },
//               },
//             },
//           ],
//           as: "wishlistInfo",
//         },
//       },
//       {
//         $addFields: {
//           isWishlist: { $gt: [{ $size: "$wishlistInfo" }, 0] },
//         },
//       },
//       {
//         $project: {
//           wishlistInfo: 0,
//         },
//       },
//     ]);

//     res.status(200).json({
//       message: "Products fetched successfully",
//       data: products,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Error fetching products",
//       error: err,
//     });
//   }
// };
