const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
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

reviewSchema.index(
  { user: 1, product: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "reviews",
  reviewSchema
);