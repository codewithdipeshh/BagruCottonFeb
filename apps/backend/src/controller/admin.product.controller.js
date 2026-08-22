const express = require("express");
const router = express.Router();

const adminProductController = require("../controller/product.controller"); // (Ya jo bhi aapki admin controller file ka naam ho)
const { authenticate, isAdmin } = require("../middleware/authenticate");

// addProduct use kiya gaya hai (createProduct ki jagah)
router.post(
  "/create",
  authenticate,
  isAdmin,
  adminProductController.addProduct
);

// Agar aapke paas update function nahi hai, toh filhal isko comment kar sakte hain ya addProduct ki tarah bana sakte hain
router.get(
  "/all",
  authenticate,
  isAdmin,
  adminProductController.getAllProducts
);

router.delete(
  "/:id",
  authenticate,
  isAdmin,
  adminProductController.deleteProduct
);

module.exports = router;