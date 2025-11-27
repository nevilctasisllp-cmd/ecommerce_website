const { default: mongoose } = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "tbl_users" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "tbl_products" },
    name: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("tbl_wishlist", wishlistSchema);
