const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Users = require("../models/usermodel");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email, password });

    if (!user) {
      console.log("user: ", user);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.active = true;
    await user.save();

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Logout route (fixes req error)
app.post("/api/logout", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOneAndUpdate({ email }, { active: false });

    if (!email) {
      console.log("email: ", email);
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Example product route
app.get("/api/products", async (req, res) => {
  try {
    res.json([{ id: 1, name: "Sample Product", price: 999 }]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.use("/api/cart", cartRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
