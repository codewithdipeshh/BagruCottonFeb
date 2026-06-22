const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountedPrice: {
      type: Number,
      required: true,
    },

    discountPercent: {
      type: Number,
      default: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings",
      },
    ],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
      },
    ],

    numRatings: {
      type: Number,
      default: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "products",
  productSchema
);