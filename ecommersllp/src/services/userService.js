const User = require("../models/usermodel");
const registerUser = require("../controllers/userController");

exports.getUserByEmail = async (email) => {
  console.log("email: ", email);
  return await User.findOne({ email });
};

exports.registerUser = async (name, email, password) => {
  const user = new User({ name, email, password });
  await user.save();
  return {};
};

// LOGIN USER
exports.loginUser = async ({ email, password }) => {
  console.log("LOGIN INPUT →", email, password);

  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const user = await User.findOne({ email });
  console.log("FOUND USER →", user);

  if (!user) throw new Error("User not found");

  const isMatch = await user.comparePassword(password);
  console.log("isMatch: ", isMatch);
  if (!isMatch) throw new Error("Invalid password");

  return user;
};

// LOGOUT (dummy)
exports.logout = async (email) => {
  return await User.findOne({ email });
};
// logout

exports.logout = async (email) => {
  console.log("email: ", email);
  return await User.findOne({ email });
};
