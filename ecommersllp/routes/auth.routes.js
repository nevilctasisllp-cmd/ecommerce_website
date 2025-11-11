const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", tbl_user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
