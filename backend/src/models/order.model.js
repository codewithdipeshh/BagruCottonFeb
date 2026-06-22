const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems",
        required: true,
      },
    ],

    orderDate: {
      type: Date,
      default: Date.now,
    },

    deliveryDate: {
      type: Date,
    },

    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      required: true,
    },

    paymentDetails: {
      paymentMethod: {
        type: String,
      },

      transactionId: {
        type: String,
      },

      paymentStatus: {
        type: String,
        enum: [
          "PENDING",
          "PAID",
          "FAILED",
          "REFUNDED",
        ],
        default: "PENDING",
      },
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    totalDiscountedPrice: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    totalItem: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "orders",
  orderSchema
);