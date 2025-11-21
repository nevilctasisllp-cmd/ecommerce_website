const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  addImages,
  updateImages,
  deleteImage,
} = require("../controllers/image.controller");

// Add images to product
router.post("/products/:id/images", upload.array("images", 10), addImages);

// Update product images (add more)
router.put("/products/:id/images", upload.array("images", 10), updateImages);

// Delete image
router.delete("/images/:imageId", deleteImage);

module.exports = router;
