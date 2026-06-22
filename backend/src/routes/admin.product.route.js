const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const { authenticate } = require("../middleware/authenticate");

// Create Product
router.post(
  "/create",
  authenticate,
  productController.createProduct
);
// Update Product
router.put(
  "/:id",
  authenticate,
  productController.updateProduct
);

// Delete Product
router.delete(
  "/:id",
  authenticate,
  productController.deleteProduct
);

module.exports = router;