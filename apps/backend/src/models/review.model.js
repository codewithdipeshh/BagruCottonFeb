const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
      trim: true,
      minlength: 3, // Changed from 10 to 3 for easier testing ("Good", "Nice" will work now)
      maxlength: 1000,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
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

    images: [
      {
        type: String, // Cloudinary URLs will be saved here
      }
    ],

    helpfulVotes: {
      type: Number,
      default: 0,
    },

    votedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      }
    ],

    verifiedPurchase: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// 1 User can only write 1 review per product
reviewSchema.index(
  { user: 1, product: 1 },
  { unique: true }
);

// Optimize fetching latest reviews for a product
reviewSchema.index({ product: 1, createdAt: -1 });

module.exports = mongoose.model("reviews", reviewSchema);