const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Wishlist = require("../models/wishlist.model");

router.get("/", auth, async (req, res) => {
  const wl = await Wishlist.findOne({ user: req.user.id });
  res.json(wl || { items: [] });
});

router.post("/add", auth, async (req, res) => {
  try {
    const { productId, title, price } = req.body;
    if (!productId)
      return res.status(400).json({ message: "productId required" });
    let wl = await Wishlist.findOne({ user: req.user.id });
    if (!wl) wl = await Wishlist.create({ user: req.user.id, items: [] });
    if (!wl.items.some((i) => i.productId === productId)) {
      wl.items.push({ productId, title, price: Number(price) || 0 });
      await wl.save();
    }
    res.json({ message: "Added", wl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/remove", auth, async (req, res) => {
  const { productId } = req.body;
  let wl = await Wishlist.findOne({ user: req.user.id });
  if (!wl) return res.json({ items: [] });
  wl.items = wl.items.filter((i) => i.productId !== productId);
  await wl.save();
  res.json({ message: "Removed", wl });
});

module.exports = router;
