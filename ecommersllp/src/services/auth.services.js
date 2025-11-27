// src/services/auth.service.js

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerService = async (data) => {
  const { username, email, password } = data;

  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("Email already registered");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashed,
  });

  user.password = undefined; // hide password
  return user;
};

exports.loginService = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET || "mysupersecretkey",
    { expiresIn: "7d" }
  );

  return {
    token,
    user: { id: user._id, username: user.username, email: user.email },
  };
};
