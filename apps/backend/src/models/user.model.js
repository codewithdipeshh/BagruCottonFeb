const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["CUSTOMER", "ADMIN"],
    default: "CUSTOMER",
  },

  mobile: {
    type: String,
  },

  // 🔴 Email Verification Fields
  isVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: {
    type: String,
    default: null,
  },

  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],

  paymentInformation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment_information",
    },
  ],

  rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rating",
    },
  ],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],

  resetPasswordToken: {
    type: String,
    default: null,
  },

  resetPasswordExpires: {
    type: Date,
    default: null,
  },

  otp: {
    type: String,
    default: null,
  },

  otpExpires: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;