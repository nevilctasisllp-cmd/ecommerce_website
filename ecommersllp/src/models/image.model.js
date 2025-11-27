const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  image_url: String,
  filename: String,
});

module.exports = mongoose.model("Image", imageSchema);
