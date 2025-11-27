// src/controller/auth.controller.js

const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const user = await authService.registerService(req.body);
    res.status(200).json({ message: "Registered", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const response = await authService.loginService(req.body);
    res.status(200).json({
      message: "Login success",
      token: response.token,
      user: response.user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
