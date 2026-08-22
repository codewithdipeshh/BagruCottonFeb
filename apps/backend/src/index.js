const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"], 
  credentials: true,               
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"] 
}));;

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Welcome to Bagru Cotton API",
    status: true,
  });
});

// Auth Routes
const authRouter = require("./routes/auth.route");
app.use("/auth", authRouter);

// User Routes
const userRouter = require("./routes/user.route");
app.use("/users", userRouter);

// Product Routes (Customer)
const productRouter = require("./routes/product.route");
app.use("/products", productRouter);

// Product Routes (Admin)
const adminProductRoutes = require("./routes/admin.product.route");
app.use("/api/admin/products", adminProductRoutes);

const adminAuthRoutes = require("./routes/adminAuthRoutes");
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", adminAuthRoutes);

// Cart Routes
const cartRouter = require("./routes/cart.route");
app.use("/cart", cartRouter);

// Cart Item Routes
const cartItemRouter = require("./routes/cartitem.route");
app.use("/cart_items", cartItemRouter);

// Order Routes
const orderRouter = require("./routes/order.route");
app.use("/orders", orderRouter);

// Admin Order Routes
const adminOrderRouter = require("./routes/order.route");
app.use("/admin/orders", adminOrderRouter);

// Review Routes
const reviewRouter = require("./routes/review.route");
app.use("/reviews", reviewRouter);

// Rating Routes
const ratingRouter = require("./routes/rating.route");
app.use("/ratings", ratingRouter);

const wishlistRoutes = require("./routes/wishlist.routes");
app.use("/wishlist", wishlistRoutes);

module.exports = app;