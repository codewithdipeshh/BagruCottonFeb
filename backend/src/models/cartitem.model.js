const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    discountedPrice: {
      type: Number,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model(
  "cartItems",
  cartItemSchema
);

module.exports = CartItem;