const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const User = require("./models/user.model");

const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(` Server running on port ${process.env.PORT}`)
);

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });
  if (user.password !== password)
    return res.status(400).json({ message: "Incorrect password" });

  res.json({ message: "Login successful", user });
});

app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);

  if (user) {
    console.log(`Password reset link sent to ${email}`);
    res.json({ success: true, message: "Reset link sent!" });
  } else {
    res.status(404).json({ error: "Email not found" });
  }
});
