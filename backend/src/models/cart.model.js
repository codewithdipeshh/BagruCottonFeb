const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },

    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartItems",
      },
    ],

    totalPrice: {
      type: Number,
      default: 0,
    },

    totalDiscountedPrice: {
      type: Number,
      default: 0,
    },

    totalItems: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("carts", cartSchema);