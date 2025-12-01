const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const UserRoutes = require("./src/routes/user.routes");
const productRoutes = require("./src/routes/product.routes");
const userRoutes = require("./src/routes/user.routes");
const cartRoutes = require("./src/routes/cart.routes");
const checkout = require("./src/routes/checkoutRoutes");
const imageRoutes = require("./src/routes/image.routes");
const upload = require("./src/middleware/upload");
const path = require("path");
const wishlist = require("../ecommersllp/src/routes/wishlist.routes");
const orderRoutes = require("./src/routes/order.routes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", UserRoutes);
app.use("/api/products", require("./src/routes/product.routes"));
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/checkout", checkout);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", imageRoutes);
app.use("/api/wishlist", wishlist);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.json({ ok: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

listener = app.listen(process.env.PORT || 3000, () => {
  console.log("process.env.PORT: ", process.env.PORT);
});
