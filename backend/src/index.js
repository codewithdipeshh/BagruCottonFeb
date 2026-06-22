const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

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
const adminProductRouter = require("./routes/admin.product.route");
app.use("/admin/products", adminProductRouter);

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

module.exports = app;