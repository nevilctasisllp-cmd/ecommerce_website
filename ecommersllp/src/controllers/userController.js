const userService = require("../services/userService");
const User = require("../models/usermodel");
const express = require("express");
const usermodel = require("../models/usermodel");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    await userService.registerUser(name, email, password);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await userService.loginUser({ email, password });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    // send meaningful status
    if (
      err.message === "User not found" ||
      err.message === "Invalid password"
    ) {
      return res.status(401).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

// LOGOUT
exports.logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userService.logout(email);
    if (!email) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Logout successfull", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE USER (ADMIN)
exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ message: "User created!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LIST USERS
exports.listUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
