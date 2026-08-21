const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true 
    },
    tag: {
      type: String,
      default: "Certified Handloom",
      trim: true
    },
    philosophy: {
      type: String,
      required: true,
    },
    specifications: {
      type: String,
      required: true,
    },
    washCare: {
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
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    images: [
      {
        type: String,
        required: true,
      }
    ],
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
      type: String,
      required: true,
      enum: [
        'maheshwari_silk_saree',
        'kota_doria_silk',
        'chanderi_silk_saree',
        'mulmul_cotton_sarees',
        'cotton_handblock_sarees',
        'cotton_linen_saree'
      ] 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("products", productSchema);