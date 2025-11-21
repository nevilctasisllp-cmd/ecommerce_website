const Product = require("../models/product.model");
const Image = require("../models/image.model");

// -------------------- ADD IMAGES --------------------
exports.addImages = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const imageDocs = req.files.map((file) => ({
      productId: productId,
      url: `/uploads/${file.filename}`,
      filename: file.originalname,
    }));

    const savedImages = await Image.insertMany(imageDocs);

    product.images.push(...savedImages.map((img) => img._id));
    await product.save();

    res.json({
      message: "Images added successfully",
      images: savedImages,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding images" });
  }
};

// -------------------- UPDATE (ADD MORE) IMAGES --------------------
exports.updateImages = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newImages = req.files.map((file) => ({
      productId: productId,
      url: `/uploads/${file.filename}`,
      filename: file.originalname,
    }));

    const savedImages = await Image.insertMany(newImages);

    product.images = [...product.images, ...savedImages.map((img) => img._id)];
    await product.save();

    res.json({
      message: "Images updated successfully",
      newImages: savedImages,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating images" });
  }
};

// -------------------- DELETE IMAGE --------------------
exports.deleteImage = async (req, res) => {
  try {
    const imageId = req.params.imageId;

    const image = await Image.findById(imageId);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Remove image from product array
    await Product.findByIdAndUpdate(image.productId, {
      $pull: { images: imageId },
    });

    // Delete image document
    await Image.findByIdAndDelete(imageId);

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting image" });
  }
};
