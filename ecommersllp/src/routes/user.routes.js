const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  createUser,
  listUsers,
} = require("../controllers/userController");

// AUTH ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/logout", logoutUser);

// ADMIN / NORMAL USER MANAGEMENT
router.post("/create", createUser);
router.get("/", listUsers);

module.exports = router;
